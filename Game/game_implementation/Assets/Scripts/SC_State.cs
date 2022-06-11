using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SC_State : MonoBehaviour
{
    // Start is called before the first frame update
    private static SC_State instance;
    public static SC_State Instance
    {
        get
        {
            if (instance == null)
                instance = GameObject.Find("SC_State").GetComponent<SC_State>();

            return instance;
        }
    }
   
    public enum GM_STATE
    {

        INIT,
        START_CONNECT_SENSOR,
        WAIT_SENSOR,
        SENSOR_READY,
        FREEZ,
        RUNNING,
        ERROR_USER,
        END,
        ERROR_SYS,
        END_THREAD
       

    }
    private GM_STATE currentState = GM_STATE.INIT;
    public void  setState(GM_STATE state) {
        currentState = state;


    }
    public GM_STATE getState() { return currentState; }

    public enum SN_STATE
    {

        STOP_SENSOR,
        START_CONNECT_SENSOR,
        WHIL_CONNECT_SENSOR,
        FAIL_CONNECT_SENSOR,
        SECSSES_CONNECT_SENSOR,
        INIT_ATTENSION,
        SENSOR_READY,
        READ_ATTENSION,
        



    }
    private SN_STATE currentStateSn = SN_STATE.STOP_SENSOR;
    public void setStateSn(SN_STATE state)
    {
        currentStateSn = state;


    }
    public SN_STATE getStateSn() { return currentStateSn; }

}
