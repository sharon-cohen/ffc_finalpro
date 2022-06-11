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

    private GameObject txt_btn_submit_or_startGame;
    private GameObject InputField_codeTest;
    private GameObject txt_status_input_code;

    // end pages component

    // end page Referance

    // Game Over message
    private GameObject CanvaGameOver;
    public int score = 0;
    private GameObject theCamera;
    private bool isJumping = false;
    private bool waiteStopFall = false;
    GameObject WaitConnection;
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
        connectedPage_btnTryAgin.SetActive(false);
        connectedPage_txtStatusConnection = GameObject.Find("txr_resultConnectServer");
        // end connectServerPage
        // inputTestCodePage
        inputPage = GameObject.Find("inputTestCodePage");
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
        if (SC_State.Instance.getState() == SC_State.GM_STATE.INIT) {
            btn_call_back_connectedPage_txtStatusConnection();
        }
        if (SC_State.Instance.getState() == SC_State.GM_STATE.SENSOR_READY)
        {
            WaitConnection.SetActive(false);
            SC_State.Instance.setState(SC_State.GM_STATE.RUNNING);

        }

        if (SC_State.Instance.getState() == SC_State.GM_STATE.RUNNING)
        {
           
            SC_player.Instance.setGravity();
            if (Input.GetKeyDown(KeyCode.Space) && SC_player.Instance.check_is_ground())
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
        SC_DLL.Instance.btn_tryConnectionDLL();
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
            start_the_game();
            inputPage.SetActive(false);


        }
    }

    void start_the_game() {
        WaitConnection = GameObject.Find("WaitConnection");
        SC_SliderControl.Instance.Start_SC_SliderControl();
        SC_player.Instance.Start_player();
        SC_DLL.Instance.dll_start();
        SC_State.Instance.setState(SC_State.GM_STATE.WAIT_SENSOR);
        theCamera.GetComponent<SC_FollowCamera>().Start_SC_FollowCamera();
        CanvaGameOver = GameObject.Find("CanvaGameOver");
        CanvaGameOver.SetActive(false);

            
    }
    public void end_session() {
        CanvaGameOver.SetActive(true);
        CanvaGameOver.GetComponent<SC_gameOver>().turnOnGameOver();
    }

}
