using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using fts;
using UnityEngine.UI;

using System;
[PluginAttr("NeruskyLibery")]
public static class FooPluginAPI_Auto
{
    [PluginFunctionAttr("DisplayHelloFromDLL")]
    public static DisplayHelloFromDLL displayHelloFromDLL = null;
    public delegate int DisplayHelloFromDLL();
    [PluginFunctionAttr("SensorConnect")]
    public static SensorConnect sensorConnect = null;
    public delegate int SensorConnect();
    [PluginFunctionAttr("getAtteintion")]
    public static getAtteintion get_Atteintion = null;
    public delegate int getAtteintion();
    [PluginFunctionAttr("SensorDisconnect")]
    public static SensorDisconnect sensorDisconnect = null;
    public delegate int SensorDisconnect();


}
public class SC_sensor : MonoBehaviour
{
    string dateNow = DateTime.Now.ToString();
    List<string> sensorLog;
    public GameObject at_txt;
    // Update is called once per frame

    private static SC_sensor instance;
    public static SC_sensor Instance
    {
        get
        {
            if (instance == null)
                instance = GameObject.Find("SC_sensor").GetComponent<SC_sensor>();

            return instance;
        }
    }
    void Start() {
        sensorLog = new List<string>();
    }
    void FixedUpdate()
    {
        at_txt.GetComponent<Text>().text = "update: ";
        if (SC_State.Instance.getStateSn() == SC_State.SN_STATE.START_CONNECT_SENSOR) {
            SC_State.Instance.setStateSn(SC_State.SN_STATE.WHIL_CONNECT_SENSOR);
            sensorLog.Clear();
            int res = FooPluginAPI_Auto.sensorConnect();
            Debug.Log("connction is seccsees " + res.ToString());
            if (res == 1)
                SC_State.Instance.setStateSn(SC_State.SN_STATE.SECSSES_CONNECT_SENSOR);
            else
                SC_State.Instance.setStateSn(SC_State.SN_STATE.FAIL_CONNECT_SENSOR);

        }
        if (SC_State.Instance.getStateSn() == SC_State.SN_STATE.INIT_ATTENSION)
        {
            at_txt.GetComponent<Text>().text = "INIT_ATTENSION: "; ;
            string date = DateTime.Now.ToString();
            int at = FooPluginAPI_Auto.get_Atteintion();
            Debug.Log( "INFO [SN] Attention: " + at.ToString());
            at_txt.GetComponent<Text>().text = date+"INFO [SN] Attention: " + at.ToString();
            if (at != 0) {
                SC_State.Instance.setStateSn(SC_State.SN_STATE.SENSOR_READY);
            }
        }
        if (SC_State.Instance.getStateSn() == SC_State.SN_STATE.READ_ATTENSION)
        {
            at_txt.GetComponent<Text>().text = "READ_ATTENSION: " ;
            int at = FooPluginAPI_Auto.get_Atteintion();
            at_txt.GetComponent<Text>().text = "INFO [SN] Attention: " + at.ToString();
            string date = DateTime.Now.ToString();
            if (date != dateNow)

            {
                Debug.Log(date + "INFO [SN] Attention: " + at.ToString());
                sensorLog.Add(date + "INFO [SN] Attention: " + at.ToString());
                at_txt.GetComponent<Text>().text = "INFO [SN] Attention: " + at.ToString();
                dateNow = date;
            }

        }
        

    }

    public void disconnect_sensor() {
        Debug.Log("disconnected " + FooPluginAPI_Auto.sensorDisconnect().ToString());
    }

    public List<string> get_sensor_log() { return sensorLog; }
}
