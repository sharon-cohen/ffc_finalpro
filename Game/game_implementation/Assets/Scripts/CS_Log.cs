
using UnityEngine;
using UnityEditor;
//#if UNITY_EDITOR
//using UnityEditor;
//#endif
using System.IO;
using System;
using System.Collections.Generic;
using System.Collections;
public class CS_Log : MonoBehaviour
{
    // Start is called before the first frame update
    private static CS_Log instance;
    public static CS_Log Instance
    {
        get
        {
            if (instance == null)
                instance = GameObject.Find("CS_Log").GetComponent<CS_Log>();

            return instance;
        }
    }

    StreamWriter writer;
    string path;
    List<string> gameLog = new List<string>();
    void Start() {
      
        path = System.IO.Directory.GetCurrentDirectory() + "\\Assets\\Resources\\test.txt";
        path.Replace("\\", "/");
         writer= new StreamWriter(path, false);
    }

    private string infoLine() {
        return DateTime.Now + "INFO [SN] " + SC_State.Instance.getState().ToString() + " ";
    }

    public void WriteStart(){
        string info = infoLine() + "Game Is Started";
        gameLog.Add(info);
        writer.WriteLine(info);
    }
    public void WriteEnd()
    {
        string info = infoLine() + "Game Is Started";
        gameLog.Add(info);
        writer.WriteLine(info);
    }
    public void WriteJump(float dis)
    {
        string info = infoLine() + "Jump " + "distance: " + dis.ToString();
        gameLog.Add(info);
        writer.WriteLine(info);

    }
    public void WriteBlock(string blockId, string date) { 
        string info = date.ToString() + "BlockId: "+ blockId;
        Debug.Log(date + "BlockId: " + blockId);
        gameLog.Add(info);
        writer.WriteLine(info);

    }
    public void WriteResultJump(SC_player.GM_JUMP jumpStatus) {
        string info = infoLine() + "ResultJump: " + jumpStatus.ToString();
        gameLog.Add(info);
        writer.WriteLine(info);
    }

 

    public List<string> get_gameLog() { return gameLog; }
}
