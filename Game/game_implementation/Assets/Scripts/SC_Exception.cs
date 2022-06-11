using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class SC_Exception : MonoBehaviour
{
    // Start is called before the first frame update
    public float timeRemaining;
    public float timeRemainingExit;
    public bool timerIsRunningExit;
    bool waiteForAttendion;
    public Text timeText_Exit;
    string lastPlatformFail;
    int numSamePlatformFaile;
    private static SC_Exception instance;
    public static SC_Exception Instance
    {
        get
        {
            if (instance == null)
                instance = GameObject.Find("SC_Exception").GetComponent<SC_Exception>();

            return instance;
        }
    }
    void Start()
    {
        waiteForAttendion = false;
        timeRemaining = 10f;
        timeRemainingExit = 5f;
        timerIsRunningExit = false;
        lastPlatformFail = "";
        numSamePlatformFaile = 0;

    }

    // Update is called once per frame
    void Update()
    {

        if (timerIsRunningExit) {
            if (timeRemainingExit > 0)
            {
                timeRemainingExit -= Time.deltaTime;
                timeText_Exit.text = timeRemainingExit.ToString("0");

            }
            else
            {
                var currentProc = System.Diagnostics.Process.GetCurrentProcess();
                string name = currentProc.ProcessName;

                Debug.Log(name);
                currentProc.CloseMainWindow();

            }
        }


        if (waiteForAttendion) {
           
            if (timeRemaining > 0)
                timeRemaining -= Time.deltaTime;
            else {
                timeRemaining = 0;
                Debug.Log("connection Error!!!");
                SC_State.Instance.setState(SC_State.GM_STATE.ERROR_SYS);
                waiteForAttendion = false ;
                timerIsRunningExit = true;
            }
        }
        else {
            timeRemaining = 10f;
           
        }
    }
    public void  set_waiteForAttendion(bool val) {
        waiteForAttendion = val;
    }
    public bool ReportFall(string namePlat) {
        if (namePlat == lastPlatformFail)
        {
            numSamePlatformFaile++;
            if (numSamePlatformFaile == 5) {
                SC_State.Instance.setState(SC_State.GM_STATE.ERROR_USER);
                timerIsRunningExit = true;
                return false;
            }
        }
        else {
            numSamePlatformFaile = 0;
            lastPlatformFail = namePlat;
        }
        return true;

    }
}
