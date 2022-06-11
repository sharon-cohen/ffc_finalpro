using System.Collections;
using System.Collections.Generic;
using UnityEngine;


public class SC_GamePrefabs : MonoBehaviour
{
    private Dictionary<string, GameObject> unityPrefabs;
    // Start is called before the first frame update
    private static SC_GamePrefabs instance;
    public static SC_GamePrefabs Instance
    {
        get
        {
            if (instance == null)
                instance = GameObject.Find("SC_GamePrefabs").GetComponent<SC_GamePrefabs>();

            return instance;
        }
    }

    void Awake()
    {
        Init();
    }
    private void Init()
    {
        unityPrefabs = new Dictionary<string, GameObject>();
        for (int i = 1; i < 20; i++) {
            GameObject gamePlatform = Resources.Load("Prefabs/Platform_"+i.ToString()) as GameObject;
            unityPrefabs["Platform_"+i.ToString()] = gamePlatform;
        }
    }

    public GameObject GetGameObj(int numberPlatform)
    {
        
        return (GameObject)Instantiate(unityPrefabs["Platform_" + numberPlatform.ToString()]);
    }


}
