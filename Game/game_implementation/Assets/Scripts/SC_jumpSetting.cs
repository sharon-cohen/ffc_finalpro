using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SC_jumpSetting : MonoBehaviour
{
    // Start is called before the first frame update
    public Dictionary<string,int > platformAndSpeed;
    public Dictionary<string, float> platformAndGap;
    private List<float> posibbleGap;
    private static SC_jumpSetting instance;
    public static SC_jumpSetting Instance
    {
        get
        {
            if (instance == null)
                instance = GameObject.Find("SC_jumpSetting").GetComponent<SC_jumpSetting>();

            return instance;
        }
    }

    void Awake()
    {
        Init();
    }
    private void Init()
    {
        posibbleGap = new List<float>();
        posibbleGap.Add(2);
        posibbleGap.Add(3);
        posibbleGap.Add(4);
        posibbleGap.Add(3);
        posibbleGap.Add(4.5f);
        posibbleGap.Add(6);
        platformAndSpeed = new Dictionary<string, int>();
        for (int i = 1; i < 20; i++)
        {
            if (i > 9)
            {
                platformAndSpeed["Platform_" + i.ToString()] = 7;
            }
            else {
                platformAndSpeed["Platform_" + i.ToString()] = 5;
            }
        }
        platformAndGap  = new Dictionary<string, float>();

        int index = -1;
        for (int i = 0; i < 18; i++)
        {
            if (i % 3 == 0)
            {
                index++;
                int platformInd = i + 1;
                platformAndGap["Platform_" + platformInd.ToString()] = posibbleGap[index];

            }
            else {
                int platformInd = i + 1;
                platformAndGap["Platform_" + platformInd.ToString()] = posibbleGap[index];
            }
            
        }
    }

    public float getGravity(int speed, float gap) {
        if (speed == 5) {
            if (gap == 2) return 9;
            if (gap == 3) return 7f;
            if (gap == 4) return 5.8f;

        }
        if (speed == 7)
        {
            if (gap == 3) return 9;
            if (gap == 4.5) return 7;
            if (gap == 6) return 5.8f;

        }
        return 0;
    }
}
