using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SC_gameLogic : MonoBehaviour
{
    // Start is called before the first frame update
    private int MAX_PLATFORM = 18;
    private int nameN = 3;
    private bool EndExsist = false;
    private Vector2 lastEndPosition;
    [SerializeField] private Transform perantPlatforms;
    List<GameObject> Platforms;
    private Dictionary<string, int> managePlatform;
    List<int> platformChoose;
    private static SC_gameLogic instance;
    public static SC_gameLogic Instance
    {
        get
        {
            if (instance == null)
                instance = GameObject.Find("SC_gameLogic").GetComponent<SC_gameLogic>();

            return instance;
        }
    }
    private void Awake()
    {
       

    }
    void Start()
    {
       
        managePlatform = new Dictionary<string, int>();
        for (int i = 1; i < MAX_PLATFORM+1; i++)
        {
            managePlatform["Platform_" + i.ToString()] = 1;
        }
        platformChoose = new List<int>();
        for (int i = 1; i < MAX_PLATFORM+1; i++)
        {
            platformChoose.Add(i);
        }
        lastEndPosition = new Vector2(18, -3);
        Platforms = new List<GameObject>();
    }

    // Update is called once per frame
    void Update()
    {
        
    }
    public void add_platform() {
        if (!EndExsist) {
            GameObject lastLevelPartTransform;
            string fullnamePlatform;
            if (check_end_platform())
            {
                lastLevelPartTransform = SpawnLevelPart(19);
                fullnamePlatform = "Platform_" + "19";
                EndExsist = true;
            }
            else
            {
                int platforNumber = get_random_platform_number();
                lastLevelPartTransform = SpawnLevelPart(platforNumber);
                fullnamePlatform = "Platform_" + platforNumber.ToString();
                managePlatform[fullnamePlatform] = managePlatform[fullnamePlatform] + 1;

                if (managePlatform[fullnamePlatform] == 2)
                {
                    for (int i = 0; i < platformChoose.Count; i++)
                    {
                        if (platformChoose[i] == platforNumber)
                        {
                            Debug.Log("fullnamePlatform");
                            platformChoose.Remove(platforNumber);
                        }
                    }
                }
            }
            Platforms.Add(lastLevelPartTransform);
            lastLevelPartTransform.name = lastLevelPartTransform.name + "_" + nameN.ToString();
            nameN++;
            float neWPositionX = lastLevelPartTransform.transform.localScale.x / 2;
            neWPositionX = neWPositionX + lastEndPosition.x;
            lastLevelPartTransform.transform.position = new Vector2(neWPositionX, lastEndPosition.y);
            lastLevelPartTransform.transform.SetParent(perantPlatforms);
            lastEndPosition.x = neWPositionX + lastLevelPartTransform.transform.localScale.x / 2;
        }
      }

    private GameObject SpawnLevelPart(int numPlatform)
    {
        GameObject levelPartTransform = SC_GamePrefabs.Instance.GetGameObj(numPlatform);
        return levelPartTransform;
    }
    public Vector3 get_return_position(string currentNamePlatform) {
        string[] pureName = currentNamePlatform.Split(' ');
        currentNamePlatform = pureName[0];
        for (int i = 0; i < Platforms.Count; i++) {
            if (Platforms[i].name == currentNamePlatform) {
                return get_start_position_of_game_object(Platforms[i]);
            }
        }
        return new Vector3(0, 0, 0);
    }

    private Vector3 get_start_position_of_game_object(GameObject ob) {
        Vector3 pos = ob.transform.position;
        Vector3 scale = ob.transform.localScale;
        float halfX = scale.x / 2;
        return new Vector3((pos.x - halfX)+0.3f, pos.y+2, pos.z);
    }
    private int get_random_platform_number() {
        int lenList = platformChoose.Count;
        int rand = Random.Range(0, lenList);
        return platformChoose[rand];

    }
    private bool check_end_platform() { 
        if (platformChoose.Count == 0)
        {
            return true;
        }
        return false;
    
    }
    public void stopGameAfterFalling() {
       
        SC_timer.Instance.active();


    }
    public void contuniueGameAfterFalling()
    {
        SC_State.Instance.setState(SC_State.GM_STATE.RUNNING);


    }

}
