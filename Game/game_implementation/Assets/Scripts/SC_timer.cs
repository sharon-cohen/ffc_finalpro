using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
public class SC_timer : MonoBehaviour
{
    public float timeRemaining;
    public bool timerIsRunning;
    public Text timeText;
    private static SC_timer instance;
    public static SC_timer Instance
    {
        get
        {
            if (instance == null)
                instance = GameObject.Find("SC_timer").GetComponent<SC_timer>();

            return instance;
        }
    }
    private void Start()
    {
        init();
      
    }
    void init() {
        timerIsRunning = false;
        timeRemaining = 3f;
        timeText.text = "";


    }
    void Update()
    {
       
        if (SC_State.Instance.getState() != SC_State.GM_STATE.END)
        {
            if (timerIsRunning)
            {
                if (timeRemaining > 0)
                {
                    timeRemaining -= Time.deltaTime;
                    timeText.text = timeRemaining.ToString("0");

                }
                else
                {
                    stop();
                }
            }
        }
    }
    public void active() {
        
        if (SC_State.Instance.getState() == SC_State.GM_STATE.END)
        {
            timeText.text = "The session is over - The game will close automatically after the data is uploaded";
            timerIsRunning = false;
        }
        else
        {
            timeText.text = "3";
            timerIsRunning = true;
        }
    }
    public void stop()
    {
        init();

        SC_gameLogic.Instance.contuniueGameAfterFalling();

    }
}
