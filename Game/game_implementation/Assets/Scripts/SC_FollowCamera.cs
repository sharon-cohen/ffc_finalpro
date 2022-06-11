using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SC_FollowCamera : MonoBehaviour
{
    // Start is called before the first frame update
    private bool activeTheScript = false;
    public Transform followTransform;
    public bool toFollow;
    private float prevY =0f;
    Transform backround;
    

    public void Start_SC_FollowCamera() {
        followTransform = GameObject.Find("body").transform;
        toFollow = true;
        backround = GameObject.Find("7Z_2104.w028.n002.57A.p15.57").transform;
        activeTheScript = true;
    }
    void FixedUpdate()
    {
        if (activeTheScript)
        {
            if (toFollow)
            {
                this.transform.position = new Vector3(followTransform.position.x + 6.0f, followTransform.position.y + 3.0f, this.transform.position.z);
                backround.position = new Vector3(followTransform.position.x + 6.0f, followTransform.position.y + 3.0f, backround.position.z);
                prevY = followTransform.position.y + 3.0f;
            }
            else
            {
                this.transform.position = new Vector3(followTransform.position.x + 6.0f, prevY, this.transform.position.z);
                backround.position = new Vector3(followTransform.position.x + 6.0f, prevY, backround.position.z);
            }

        }
    }
    public void notFollow() {
        toFollow = false;
    }
    public void Follow()
    {
        toFollow = true ;

    }
}
