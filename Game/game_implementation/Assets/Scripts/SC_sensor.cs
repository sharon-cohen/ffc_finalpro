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
   
    private float time = 0.0f;
    public float interpolationPeriod = 4.0f;
    int rnage = 0;
    int tryc = 0;
    int demo = 0;
   
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
     
        if (SC_State.Instance.getStateSn() == SC_State.SN_STATE.START_CONNECT_SENSOR) {
            Debug.Log("dds");
            SC_State.Instance.setState(SC_State.GM_STATE.WAIT_SENSOR);
            SC_State.Instance.setStateSn(SC_State.SN_STATE.WHIL_CONNECT_SENSOR);

            sensorLog.Clear();
            int res = FooPluginAPI_Auto.sensorConnect();
            //if (tryc == 1) 
            //{
                //res = 0;
                //demo = ;
            //}
               
            if (res == 0)
            {
                SC_State.Instance.setStateSn(SC_State.SN_STATE.SECSSES_CONNECT_SENSOR);
                Debug.Log("connction is seccsees " + res.ToString());
                
            }

            else

            {
                SC_State.Instance.setStateSn(SC_State.SN_STATE.FAIL_CONNECT_SENSOR);

                Debug.Log("connction is faile " + res.ToString());
                tryc = 1;

            }
           

        }
        if (SC_State.Instance.getStateSn() == SC_State.SN_STATE.INIT_ATTENSION)
        {

            if (demo == 0)
            {

                string date = DateTime.Now.ToString();
                int at = FooPluginAPI_Auto.get_Atteintion();
               

                Debug.Log("INFO [SN] Attention: " + at.ToString());

                
                if (at != 0)
                {
                    SC_State.Instance.setStateSn(SC_State.SN_STATE.SENSOR_READY);
                }
                time += Time.deltaTime;
            }
            else 
            {
                SC_State.Instance.setStateSn(SC_State.SN_STATE.SENSOR_READY);
            }
           
        }
        if (SC_State.Instance.getStateSn() == SC_State.SN_STATE.READ_ATTENSION)
        {
          
            if (demo == 0)
            {
                int at = FooPluginAPI_Auto.get_Atteintion();

                string date = DateTime.Now.ToString();
                if (date != dateNow)

                {
                    Debug.Log(date + "INFO [SN] Attention: " + at.ToString());
                    sensorLog.Add(date + "INFO [SN] Attention: " + at.ToString());
                    dateNow = date;
                }
            }

        }
        

    }

    public void disconnect_sensor() {
       if (demo == 0)
        Debug.Log("disconnected " + FooPluginAPI_Auto.sensorDisconnect().ToString());
    }

    public List<string> get_sensor_log() { return sensorLog; }
}
