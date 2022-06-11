using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
public class SC_gameOver : MonoBehaviour
{
    private GameObject preProssesGameOverMessage;

    //preProssesGameOverMessage
    GameObject sensorState;
    GameObject SensorStatetext;
    GameObject SliderDB;

    // Start is called before the first frame update
    

    public void turnOnGameOver()
    {
        
        SensorStatetext = GameObject.Find("SensorStatetext");
        sensorState = GameObject.Find("sensorState");
        SliderDB = GameObject.Find("SliderDB");
        disconnected_sensor();
        uploaded_data();


    }
    void Update() {
        if (Input.GetKeyDown("k"))
            Application.Quit();
    }
 

    void disconnected_sensor() {
        SC_DLL.Instance.disconnect_sensor();
        sensorState.GetComponent<Image>().color = Color.red;
    }
   
    void uploaded_data()
    {
        SliderDB.GetComponent<SliderDB>().activeSlider = true;
        List<string> sensorLog = SC_DLL.Instance.get_sensor_log();
        SC_database.Instance.save_sensor_log(sensorLog);
        List<string> gameLog = CS_Log.Instance.get_gameLog();
        SC_database.Instance.save_game_log(gameLog);
        SliderDB.GetComponent<SliderDB>().activeSlider = false;
    }
}
