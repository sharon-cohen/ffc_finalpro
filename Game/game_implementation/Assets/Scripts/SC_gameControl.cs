using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;
using UnityEngine.UI;
using TMPro;
public class SC_gameControl : MonoBehaviour
{
    // Start is called before the first frame update
    // Pages Referance;
    private GameObject connectedPage;
    private GameObject inputPage;
    private GameObject gamePage;
    // Pages component
    private GameObject connectedPage_btnTryAgin;
    private GameObject connectedPage_txtStatusConnection;

    GameObject TryAgain_connect_sensor;

    private GameObject txt_btn_submit_or_startGame;
    private GameObject InputField_codeTest;
    private GameObject txt_status_input_code;

    // end pages component

    // end page Referance

    // Game Over message
    private GameObject CanvaGameOver;
    private GameObject CanvaSensorConnection;
    private GameObject txt_wait_sensor_connection;
    public int score = 0;
    private GameObject theCamera;
    private bool isJumping = false;
    private bool waiteStopFall = false;
    GameObject WaitConnection;
    private String currentGameState;
    private String currentSensortate;
    private String sensorState;
    private String gameState;

    private static SC_gameControl instance;
    public static SC_gameControl Instance
    {
        get
        {
            if (instance == null)
                instance = GameObject.Find("SC_gameControl").GetComponent<SC_gameControl>();

            return instance;
        }
    }
    void Start()
    {
        long milliseconds = DateTimeOffset.Now.ToUnixTimeMilliseconds();
        Debug.Log("milliseconds");

        Debug.Log(milliseconds);
        init_ref_pages();
       
        CS_Log.Instance.WriteStart();
        theCamera = GameObject.Find("Main Camera");
       


    }

    void init_ref_pages()
    {
        // connectServerPage
        connectedPage = GameObject.Find("connectServerPage");
        connectedPage_btnTryAgin = GameObject.Find("btn_connectServerAgin");
        connectedPage_txtStatusConnection = GameObject.Find("txr_resultConnectServer");
        // end connectServerPage
        // inputTestCodePage
        inputPage = GameObject.Find("inputTestCodePanel");
        txt_btn_submit_or_startGame = GameObject.Find("txt_btn_submit_or_startGame");
        InputField_codeTest = GameObject.Find("InputField_codeTest");
        txt_status_input_code = GameObject.Find("txt_status_input_code");
        inputPage.SetActive(false);
        // end inputTestCodePage
        // gamePage
        gamePage = GameObject.Find("gamePage");
        gamePage.SetActive(false);
        // endgamePage

    }
    void Update()
    {
        
        sensorState = SC_State.Instance.getStateSn().ToString();
        gameState = SC_State.Instance.getState().ToString();
        if(sensorState != currentSensortate || gameState != currentGameState )
        {
            Debug.Log(gameState);
            Debug.Log(sensorState);
            currentSensortate = sensorState;
            currentGameState = gameState;

        }
   
        
        if (SC_State.Instance.getState() == SC_State.GM_STATE.INIT) {
            
            btn_call_back_connectedPage_txtStatusConnection();
        }

        if (SC_State.Instance.getState() == SC_State.GM_STATE.WAIT_SENSOR)
        {
            if (SC_State.Instance.getStateSn() == SC_State.SN_STATE.FAIL_CONNECT_SENSOR && !TryAgain_connect_sensor.activeSelf)
            {
                txt_wait_sensor_connection.GetComponent<Text>().text = "Faile to connection the sensor";
                TryAgain_connect_sensor.SetActive(true);
            }
            if (SC_State.Instance.getStateSn() == SC_State.SN_STATE.SECSSES_CONNECT_SENSOR)
            {
                SC_State.Instance.setStateSn(SC_State.SN_STATE.INIT_ATTENSION);
            }
            if (SC_State.Instance.getStateSn() == SC_State.SN_STATE.SENSOR_READY)
            {
                SC_State.Instance.setStateSn(SC_State.SN_STATE.READ_ATTENSION);
                WaitConnection.SetActive(false);
                CanvaSensorConnection.SetActive(false);
                inputPage.SetActive(false);
                start_the_game();
                SC_State.Instance.setState(SC_State.GM_STATE.RUNNING);
            }

        }

        if (SC_State.Instance.getState() == SC_State.GM_STATE.END)
        {
            SC_State.Instance.setStateSn(SC_State.SN_STATE.STOP_SENSOR);
        }
      

        if (SC_State.Instance.getState() == SC_State.GM_STATE.RUNNING)
        {
           
            
            SC_player.Instance.setGravity();
            if (Input.GetMouseButtonDown(0) && SC_player.Instance.check_is_ground())
            {
              
               
                theCamera.GetComponent<SC_FollowCamera>().notFollow();
                isJumping = true;
                float xLocation = SC_player.Instance.jump();

            }
            if (isJumping)
            {
                if (SC_player.Instance.statuse)
                {
                    isJumping = false;
                    theCamera.GetComponent<SC_FollowCamera>().Follow();
                }
            }


            if (SC_player.Instance.check_add_new_platform()) { SC_gameLogic.Instance.add_platform(); }
            if (SC_player.Instance.check_return())
            {
                
                CS_Log.Instance.WriteResultJump(SC_player.GM_JUMP.FAIL);
                Vector3 returnPosition = SC_gameLogic.Instance.get_return_position(SC_player.Instance.currentParent);
                SC_player.Instance.set_player_position(returnPosition);
                GameObject.Find("Main Camera").transform.position = new Vector3(returnPosition.x, returnPosition.y, -10);
                if (SC_Exception.Instance.ReportFall(SC_player.Instance.currentParent))
                    PauseGame();



            }
        }
        
    }

    void  PauseGame()
    {
        SC_State.Instance.setState(SC_State.GM_STATE.FREEZ);
        SC_gameLogic.Instance.stopGameAfterFalling();
        

    }
    public void btn_tryConnection() {
        
        TryAgain_connect_sensor.SetActive(false);
        txt_wait_sensor_connection.GetComponent<Text>().text = "Wait for sensor connection";

        SC_State.Instance.setStateSn(SC_State.SN_STATE.START_CONNECT_SENSOR);
    }
    public void btn_call_back_connectedPage_txtStatusConnection()
    {
        connectedPage_txtStatusConnection.GetComponent<TMP_Text>().text = "Coneecting to the server ....";
        if (SC_database.Instance.connect_to_the_server())
        {
            connectedPage.SetActive(false);
            inputPage.SetActive(true);
        }
        else
        {
            if (!connectedPage_btnTryAgin.activeSelf)
            {
                connectedPage_btnTryAgin.SetActive(true);
            }
            connectedPage_txtStatusConnection.GetComponent<TMP_Text>().text = "the connection in Fail";
        }
    }
    public void btn_call_back_submit_or_startGamen()
    {
        
        if (txt_btn_submit_or_startGame.GetComponent<TMP_Text>().text == "Submit")
        {
            Debug.Log(txt_btn_submit_or_startGame.GetComponent<TMP_Text>().text);
            string userInput = InputField_codeTest.GetComponent<TMP_InputField>().text;
           
            if (SC_database.Instance.check_exsist_test(userInput))
            {
                if (SC_database.Instance.check_time_test())
                {
                    txt_status_input_code.GetComponent<TMP_Text>().text = "Correct Code";
                    txt_btn_submit_or_startGame.GetComponent<TMP_Text>().text = "start game";
                }
                else
                {
                    txt_status_input_code.GetComponent<TMP_Text>().text = "Unable to start the game. Test date: " + SC_database.Instance.get_test_date();
                    txt_btn_submit_or_startGame.GetComponent<TMP_Text>().text = "Submit";
                }

            }
            else
            {
             
                txt_status_input_code.GetComponent<TMP_Text>().text = "Wrong Code";
                txt_btn_submit_or_startGame.GetComponent<TMP_Text>().text = "Submit";
            }
        }
        else
        {
          
            gamePage.SetActive(true);

            move_to_connect_sensor_step();
          


        }
    }
    void move_to_connect_sensor_step() 
    {

        
       
        SC_SliderControl.Instance.Start_SC_SliderControl();
        CanvaGameOver = GameObject.Find("CanvaGameOver");
        CanvaGameOver.SetActive(false);
        CanvaSensorConnection = GameObject.Find("DialogConnectionAndInitSensor");
        WaitConnection = GameObject.Find("WaitConnection");
        TryAgain_connect_sensor = GameObject.Find("btn_tryConnection");
        txt_wait_sensor_connection = GameObject.Find("txt_wait_sensor_connection");
        TryAgain_connect_sensor.SetActive(false);
       
        SC_State.Instance.setStateSn(SC_State.SN_STATE.START_CONNECT_SENSOR);

    }
    void start_the_game() {
        theCamera.GetComponent<SC_FollowCamera>().Start_SC_FollowCamera();
        SC_player.Instance.Start_player();
        theCamera.GetComponent<SC_FollowCamera>().Start_SC_FollowCamera();
        // WaitConnection = GameObject.Find("WaitConnection");
        //SC_SliderControl.Instance.Start_SC_SliderControl();
        //SC_player.Instance.Start_player();
        //SC_DLL.Instance.dll_start();
        //SC_State.Instance.setState(SC_State.GM_STATE.WAIT_SENSOR);
        //theCamera.GetComponent<SC_FollowCamera>().Start_SC_FollowCamera();
        //CanvaGameOver = GameObject.Find("CanvaGameOver");
        //CanvaGameOver.SetActive(false);


    }
    public void end_session() {
        CanvaGameOver.SetActive(true);
        CanvaGameOver.GetComponent<SC_gameOver>().turnOnGameOver();
    }

}
