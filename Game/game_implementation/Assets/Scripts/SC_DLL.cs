using System.Collections.Generic;
using System.Collections;
using System.IO;
using UnityEngine;
using System;
using UnityEngine.UI;
using System.Runtime.InteropServices;


public class SC_DLL : MonoBehaviour
{
        
    int i = 3;
    GameObject WaitConnection;
    GameObject TryAgain;
    bool activeTheScript = false;
    class ThreadController
    {
        public bool ShouldExecute { get; set; }
    }
    private static SC_DLL instance;
    public static SC_DLL Instance
    {
        get
        {
            if (instance == null)
                instance = GameObject.Find("SC_DLL").GetComponent<SC_DLL>();

            return instance;
        }
    }
    void Start() {
        activeTheScript = false;
       
    }
    public void dll_start() {
        TryAgain = GameObject.Find("btn_tryConnection");
        Debug.Log("disable button ");
        activeTheScript = true;
        TryAgain.SetActive(false);
        SC_State.Instance.setStateSn(SC_State.SN_STATE.START_CONNECT_SENSOR);
    }
    void Update()
    {
        if (activeTheScript == true) {
            if (SC_State.Instance.getStateSn() == SC_State.SN_STATE.FAIL_CONNECT_SENSOR) {
                TryAgain.SetActive(true);
            }
            if (SC_State.Instance.getStateSn() == SC_State.SN_STATE.SECSSES_CONNECT_SENSOR)
            {
                SC_State.Instance.setStateSn(SC_State.SN_STATE.INIT_ATTENSION);
            }
            if (SC_State.Instance.getStateSn() == SC_State.SN_STATE.SENSOR_READY)
            {
                SC_State.Instance.setStateSn(SC_State.SN_STATE.READ_ATTENSION);
                SC_State.Instance.setState(SC_State.GM_STATE.SENSOR_READY);
            }
            if (SC_State.Instance.getState() == SC_State.GM_STATE.END)
            {
                SC_State.Instance.setStateSn(SC_State.SN_STATE.STOP_SENSOR);
            }

        }

    }
    // What the child thread is responsible for 

    public void btn_tryConnectionDLL()
    {
        SC_State.Instance.setStateSn(SC_State.SN_STATE.START_CONNECT_SENSOR);
        TryAgain.SetActive(false);
    }
    public void disconnect_sensor() {
         SC_sensor.Instance.disconnect_sensor();

    }
    public List<string> get_sensor_log()
    {
        return SC_sensor.Instance.get_sensor_log();
    }

}
