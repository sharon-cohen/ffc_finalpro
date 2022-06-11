using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SC_flag : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }
    void OnTriggerEnter2D(Collider2D col)
    {
        SC_State.Instance.setState(SC_State.GM_STATE.END);
        SC_gameControl.Instance.end_session();


    }
}
