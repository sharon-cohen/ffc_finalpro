import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Sector,
  Cell,
} from "recharts";
const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
};

const Results = () => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const { state } = useLocation();
  const [sensorLogSec, setsensorLogSec] = useState(null);
  const [hello, sethello] = useState("sdsd");
  function list_of_type_time_to_sec(ListTypeTime) {
    let secClculate =
      parseInt(ListTypeTime[0]) * 3600 +
      parseInt(ListTypeTime[1]) * 60 +
      parseInt(ListTypeTime[2]);
    return secClculate;
  }
  function splite_timeFormat(strTime) {
    let hour = strTime.split(":")[0];
    let min = strTime.split(":")[1];
    let sec = strTime.split(":")[2];
    return [hour, min, sec];
  }
  function timeFormat_to_long_int(strTime, totalFirstSec) {
    let splite_type_time = splite_timeFormat(strTime);
    let convertSec = list_of_type_time_to_sec(splite_type_time);
    return convertSec - totalFirstSec;
  }
  function get_list_of_number_from_string(strWithNumber) {
    const result = strWithNumber.match(/\d+/gi).map(Number);
    return result;
  }
  function number_To_level(number) {
    if (number > 12) {
      return "high";
    }
    if (number > 6) {
      return "middle";
    }
    if (number > 0) {
      return "low";
    }
  }
  function platform_to_level(strPlatform) {
    let listOfNumberString = get_list_of_number_from_string(strPlatform);
    let platformNumber = listOfNumberString[0];
    return number_To_level(platformNumber);
  }
  function attentionVsTimeChart() {
    const data = [];

    for (var [key, value] of sensorLogSec.entries()) {
      const strCopy = sensorLogSec.get(key).split(",");
      const v = key.value;
      for (const x of strCopy) {
        const atten = x.split(":");
        if (atten[0] == "attention") {
          let d = {
            year: key,
            value: atten[1],
          };
          data.push(d);
          console.log(d);
        }
      }
    }
    return data;
  }
  function levelVsAttChart() {
    const data = [];

    for (var [key, value] of sensorLogSec.entries()) {
      const strCopy = sensorLogSec.get(key).split(",");
      const v = key.value;
      let att = 0;
      let l = 0;
      for (const x of strCopy) {
        const lev = x.split(":");
        if (lev[0] == "attention") {
          att = lev[1];
          let d = {
            name: att,
            level: l,
          };
          data.push(d);
          console.log(d);
        }
        if (lev[0] == "level") {
          if (lev[1] == "low") {
            l = 1;
          }
          if (lev[1] == "high") {
            l = 3;
          }
          if (lev[1] == "middle") {
            l = 2;
          }
        }
      }
    }
    return data;
  }
  function levelVsTimeChart() {
    const data = [];

    for (var [key, value] of sensorLogSec.entries()) {
      const strCopy = sensorLogSec.get(key).split(",");
      const v = key.value;
      for (const x of strCopy) {
        const lev = x.split(":");
        if (lev[0] == "level") {
          let l = 100;
          if (lev[1] == "low") {
            l = 1;
          }
          if (lev[1] == "high") {
            l = 3;
          }
          if (lev[1] == "middle") {
            l = 2;
          }
          let d = {
            name: key,
            level: l,
          };
          data.push(d);
          console.log(d);
        }
      }
    }
    return data;
  }
  function resultJumpData() {
    let falls = 0;
    let success = 0;
    for (var [key, value] of sensorLogSec.entries()) {
      const strCopy = sensorLogSec.get(key).split(",");
      const v = key.value;
      for (const x of strCopy) {
        const atten = x.split(":");
        if (atten[0] == "theResult") {
          console.log("dsdsdsdsd");
          if (atten[1].includes("SUCCESS")) {
            success = success + 1;
          }
          if (atten[1].includes("FAIL")) {
            falls = falls + 1;
          }
        }
      }
    }
    const data = [
      { name: "falls", value: falls },
      { name: "success", value: success },
    ];
    console.log(data);
    return data;
  }
  useEffect(() => {
    const firstRowSensorLog = state.sensorLog[0];
    const lestRowSensorLog = state.sensorLog[state.sensorLog.length - 1];
    console.log(firstRowSensorLog);
    console.log(lestRowSensorLog);

    let firtTime = firstRowSensorLog.split(" ")[1];
    const lestTime = lestRowSensorLog.split(" ")[1];
    firtTime = firtTime.replaceAll(" ", "");
    const firtTimeSec = parseInt(firtTime.split(":")[2]);
    const lestTimeSec = parseInt(lestTime.split(":")[2]);
    const firtTimeMin = parseInt(firtTime.split(":")[1]);
    const lestTimeMin = parseInt(lestTime.split(":")[1]);
    const firtTimeHour = parseInt(firtTime.split(":")[0]);
    const lestTimeHour = parseInt(lestTime.split(":")[0]);

    const totalFirstSec =
      firtTimeMin * 60 + firtTimeSec + firtTimeHour * 60 * 60;
    const totalLasttSec =
      lestTimeMin * 60 + lestTimeSec + lestTimeHour * 60 * 60;
    const totalGameTimeSec = totalLasttSec - totalFirstSec;
    let newGameLog = [];
    let waitForRes = false;
    let indexNewGameLog = 0;
    let j = 0;
    console.log("==================================================");
    for (let i = 0; i < state.gameLog.length; i++)
      console.log(state.gameLog[i]);

    console.log("==================================================");
    for (let i = 0; i < state.gameLog.length; i++) {
      if (state.gameLog[i].includes("distance") && waitForRes) {
        newGameLog[indexNewGameLog] =
          newGameLog[indexNewGameLog] + ",theResult : randomJump";
        waitForRes = false;
      }
      if (state.gameLog[i].includes("distance") && !waitForRes) {
        waitForRes = true;
        newGameLog.push(state.gameLog[i]);

        indexNewGameLog = j;
        j = j + 1;
      }
      if (state.gameLog[i].includes("ResultJump") && waitForRes) {
        if (state.gameLog[i].includes("SUCCESS"))
          newGameLog[indexNewGameLog] =
            newGameLog[indexNewGameLog] + ",theResult : SUCCESS";
        if (state.gameLog[i].includes("FAIL"))
          newGameLog[indexNewGameLog] =
            newGameLog[indexNewGameLog] + ",theResult : FAIL";
        waitForRes = false;
      }
      if (
        !state.gameLog[i].includes("ResultJump") &&
        !state.gameLog[i].includes("distance")
      ) {
        newGameLog.push(state.gameLog[i]);
        j = j + 1;
      }
    }

    let map1TimejumpData = new Map();
    let lastPlatform = " ";
    for (let i = 0; i < newGameLog.length; i++) {
      if (newGameLog[i].includes("Platform")) {
        lastPlatform = newGameLog[i].split(" ")[3];
      }

      if (
        newGameLog[i].includes("distance") &&
        newGameLog[i].includes("theResult") &&
        newGameLog[i].includes("Jump")
      ) {
        newGameLog[i] =
          newGameLog[i] +
          ",platform : " +
          lastPlatform +
          ",level : " +
          platform_to_level(lastPlatform);
        console.log(newGameLog[i].split(" ")[1]);
        let keyNoSpace = String(newGameLog[i].split(" ")[1]);
        keyNoSpace = keyNoSpace.replaceAll(" ", "");
        map1TimejumpData.set(keyNoSpace, newGameLog[i]);
      }
    }

    console.log("-----------------------------------------------------------");

    let mapTwoLogs = new Map();
    for (let i = 0; i < state.sensorLog.length; i++) {
      let time = state.sensorLog[i].split(" ")[1];
      let keyNoSpace = String(time);
      keyNoSpace = keyNoSpace.replaceAll(" ", "");
      if (!map1TimejumpData.has(keyNoSpace)) {
        mapTwoLogs.set(
          keyNoSpace,
          "action:running,attention:" + state.sensorLog[i].split(" ")[5]
        );
      } else {
        let indexOfDistance = String(map1TimejumpData.get(keyNoSpace)).indexOf(
          "distance"
        );
        let strAfterDistance = String(
          map1TimejumpData.get(keyNoSpace)
        ).substring(indexOfDistance);
        let detailOFGameNoSpace = strAfterDistance.replaceAll(" ", "");
        let detailOFGameNoSpace_Acction_Attention =
          "action:jump," +
          detailOFGameNoSpace +
          ",attention:" +
          state.sensorLog[i].split(" ")[5];
        mapTwoLogs.set(keyNoSpace, detailOFGameNoSpace_Acction_Attention);
      }
    }

    let finalMap = new Map();
    for (var [key, value] of mapTwoLogs.entries()) {
      let timeLongInt = timeFormat_to_long_int(key, totalFirstSec);
      finalMap.set(timeLongInt, value + ",timeFormat:" + key);
    }
    for (var [key, value] of finalMap.entries()) {
      console.log("key - ", key);
      console.log("value - ", value);
    }

    setsensorLogSec(finalMap);
  }, []);
  return sensorLogSec ? (
    <div style={styles}>
      <div style={styles}>attention vs time</div>
      <LineChart
        width={500}
        height={300}
        data={attentionVsTimeChart()}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line type="monotone" dataKey="value" stroke="#8884d8" dot={false} />
        <XAxis dataKey="year" />
        <YAxis />
      </LineChart>
      <div>level vs time</div>
      <BarChart
        width={500}
        height={300}
        data={levelVsTimeChart()}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="level" fill="#8884d8" />
      </BarChart>
      <div>level vs attention</div>
      <BarChart
        width={500}
        height={300}
        data={levelVsAttChart()}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="level" fill="#8884d8" />
      </BarChart>
      <div>Success vs Fail</div>

      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          startAngle={180}
          endAngle={0}
          data={resultJumpData()}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        />
      </PieChart>
    </div>
  ) : (
    <div>loading</div>
  );
};

export default Results;
