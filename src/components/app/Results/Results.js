import React, { useEffect, useState } from "react";import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import pic1 from './1.jpg';
import pic2 from './2.jpg';
import pic3 from './3.jpg';
import pic4 from './4.jpg';
import pic5 from './5.jpg';
import pic6 from './6.jpg';
import pic7 from './7.jpg';
import pic8 from './8.jpg';


function Results() {
  const { state } = useLocation();
  const [sensorLogSec, setsensorLogSec] = useState([]);
  useEffect(() => {
    const firstRowSensorLog = state.sensorLog[0]
    const lestRowSensorLog = state.sensorLog[state.sensorLog.length-1]
    console.log(firstRowSensorLog);   
    console.log(lestRowSensorLog);   
    const firtTime = firstRowSensorLog.split(" ")[1];
    const lestTime = lestRowSensorLog.split(" ")[1];
    const firtTimeSec = parseInt(firtTime.split(":")[2]);
    const lestTimeSec = parseInt(lestTime.split(":")[2]);
    const firtTimeMin = parseInt(firtTime.split(":")[1]);
    const lestTimeMin = parseInt(lestTime.split(":")[1]);
    const totalFirstSec = firtTimeMin * 60 +firtTimeSec
    const totalLasttSec = lestTimeMin * 60 +lestTimeSec
    const totalGameTimeSec = totalLasttSec -totalFirstSec
    let map1 = new Map();
    let map1TimePlatform = new Map();
    let map1TimeResultJump = new Map();
    let platformSequnce = []
    
    for(let i = 0; i < state.gameLog.length; i++){
        console.log(state.gameLog[i])
      if (state.gameLog[i].includes("Platform")){
          if (!platformSequnce.includes(state.gameLog[i].split(" ")[3]))  
                platformSequnce.push(state.gameLog[i].split(" ")[3])
        let time = state.gameLog[i].split(" ")[1];  
        if (!map1TimePlatform.has(time)){
          map1TimePlatform.set(time,state.gameLog[i].split(" ")[3])
      }
      
    }
    if (state.gameLog[i].includes("SUCCESS") || state.gameLog[i].includes("FAIL") ){
      let time = state.gameLog[i].split(" ")[1];  
      if (!map1TimeResultJump.has(time)){
        map1TimeResultJump.set(time,state.gameLog[i].split(" ")[6])
      }
    }
    }
    
   
    for(let i = 0; i <= totalGameTimeSec; i++){
      map1.set(i,"")
    }
    for(let i = 0; i < state.sensorLog.length; i++){
      let sensorLogSplit = state.sensorLog[i].split(" ");
      let time = sensorLogSplit[1];
      let timeSplite = time.split(":");
      let sec = parseInt(timeSplite[2])
      let min = parseInt(timeSplite[1])
      const totaltime = min * 60 + sec
      const finalTime = totaltime - totalFirstSec
      
      if (map1TimePlatform.has(time) && map1TimeResultJump.has(time))
        map1.set(finalTime, {"time":time,"attention":sensorLogSplit[5],"platform":map1TimePlatform.get(time),"resultJump":map1TimeResultJump.get(time)}) 
      if (!map1TimePlatform.has(time) && map1TimeResultJump.has(time))
        map1.set(finalTime, {"time":time,"attention":sensorLogSplit[5],"platform":"none","resultJump":map1TimeResultJump.get(time)}) 
      if (map1TimePlatform.has(time) && !map1TimeResultJump.has(time))
        map1.set(finalTime, {"time":time,"attention":sensorLogSplit[5],"platform":map1TimePlatform.get(time),"resultJump":"none"}) 
      if (!map1TimePlatform.has(time) && !map1TimeResultJump.has(time))
        map1.set(finalTime, {"time":time,"attention":sensorLogSplit[5],"platform":"none","resultJump":"none"}) 
    }
   
   // fix secsses
   for (var [key, value] of map1.entries()) {
    
    if (value["resultJump"] == "SUCCESS" && value["platform"] != "none"){
        const platform =  value["platform"]
        console.log(platform)
        // console.log(platformSequnce)
        const index = platformSequnce.indexOf(platform)
        const theRealPlatyform = platformSequnce[index-1]
        let theKey = 0
        for (var [key1, value1] of map1.entries()){
            if (value1["platform"] == theRealPlatyform){
                theKey = key1
            }
        }
          let valueChnage = map1.get(theKey)
          valueChnage["resultJump"] = "SUCCESS"
          map1.set(theKey,valueChnage)
          let deleteRes = map1.get(key)
          deleteRes["resultJump"] = "none"
     }
   
    }
    console.log(map1);   
 
    

    
  });

  console.log(state, "THIS_IS_THE_PROJECT");
  return (
    <div className="container">
      <h1>TEST GRAPHS</h1>
      {/* <select onchange="func(this.value)">
        <option disabled selected>choose graph</option>
        <option value="FallVsSuccess.html">Falls VS successes in the game</option>
        <option value="AttentionLevel.html">Attention level * time</option>
        <option value="distanceGap.html">Response distance gap * time</option>
        <option value="distanceGapLevel.html">Response distance gap * Beam difficulty level</option>
        <option value="randomJump.html">The amount of random jumps out of the total jumps</option>
        <option value="AttentionLevelDiffLevel.html">Time * Attention level * Level of difficulty in the game </option>
        <option value="AttentionLevelJumpRes.html">Time * Attention level * Jump result </option>
        <option value="AttentionLevelResTime.html">Time * Attention level * Response time in the game </option>
      </select> */}
      <div>
      <div>
        <h3>Falls VS successes in the game</h3>
        <img src={pic1} alt="Fall VS Successe"/>
      </div>
      <div>
        <h3>Attention level * time</h3>
        <img src={pic2} alt="Fall VS Successe"/>
      </div>      <div>
        <h3>Response distance gap * time</h3>
        <img src={pic3} alt="Fall VS Successe"/>
      </div>      <div>
        <h3>Response distance gap * Beam difficulty level</h3>
        <img src={pic4} alt="Fall VS Successe"/>
      </div>      <div>
        <h3>The amount of random jumps out of the total jumps</h3>
        <img src={pic5} alt="Fall VS Successe"/>
      </div>      <div>
        <h3>Time * Attention level * Level of difficulty in the game</h3>
        <img src={pic6} alt="Fall VS Successe"/>
      </div>      <div>
        <h3>Time * Attention level * Jump result</h3>
        <img src={pic7} alt="Fall VS Successe"/>
      </div>      <div>
        <h3>Time * Attention level * Response time in the game</h3>
        <img src={pic8} alt="Fall VS Successe"/>
      </div>
      </div>
      </div>
  );
}

export default Results;
