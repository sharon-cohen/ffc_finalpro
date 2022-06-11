using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SC_start : MonoBehaviour
{
    // Start is called before the first frame update
    public float timeRemaining = 10;
    public bool timerIsRunning = false;
    public float milliseconds, seconds, minutes, hours;
    private void Start()
    {
        // Starts the timer automatically
        timerIsRunning = true;

    }
    void Update()
    {
        hours = (int)(Time.timeSinceLevelLoad / 3600f);
        minutes = (int)(Time.timeSinceLevelLoad / 60f) % 60;
        seconds = (int)(Time.timeSinceLevelLoad % 60f);
        milliseconds = (int)(Time.timeSinceLevelLoad * 1000f) % 1000;

    }

    private void OnTriggerEnter2D(Collider2D other) {
        Debug.Log("timerrrr" + hours.ToString("00") + ":" + minutes.ToString("00") + ":" + seconds.ToString("00") + ":" + milliseconds.ToString("00"));
    }
}
