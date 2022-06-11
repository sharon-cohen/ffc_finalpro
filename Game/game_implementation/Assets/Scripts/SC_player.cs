using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using System;
public class SC_player : MonoBehaviour
{
    // Start is called before the first frame update
    private Rigidbody2D rigitBody;
    private BoxCollider2D boxCollider2d;
    private string prevParent = "Platform_1";
    [SerializeField] private LayerMask platformLayerMask;
    [SerializeField] private Transform LimitReturnPoint;
    [SerializeField] private Transform FollowCamera;
    float moveSpeed = 0f;
    float initSpeed = 0f;
    public bool statuse = false;
    public string currentParentPrev = "NULL";
    public string currentParent = "Platform_1";
    bool isGround = true;
    public bool IsRotate = false;
    float timeLeft = 0.5f;
    private float posJum = 0f;
    string dateNow = DateTime.Now.ToString();
    bool inJump = false;
    bool checkAfterJump = false;
    
    public  enum GM_JUMP
    {

        SUCCESS,
        FAIL,
        NO_MEED,
    


    }
    private static SC_player instance;
    public static SC_player Instance
    {
        get
        {
            if (instance == null)
                instance = GameObject.Find("body").GetComponent<SC_player>();

            return instance;
        }
    }

  

    // Update is called once per frame
    public void Start_player() {

        rigitBody = transform.GetComponent<Rigidbody2D>();
        boxCollider2d = transform.GetComponent<BoxCollider2D>();
    }
    void Update()
    {

        if (SC_State.Instance.getState() == SC_State.GM_STATE.RUNNING)
        {
            if (!isGround) { timeLeft = 0.5f; }
            if (isGround)
            {
                timeLeft -= Time.deltaTime;
                if ((timeLeft <= 0))
                {
                    rigitBody.velocity = new Vector2(rigitBody.velocity.x, 0);
                    rigitBody.rotation = 0f;
                    timeLeft = 0.5f;
                }

            }

            current_platform_name();
            if (prevParent != currentParent)
                Debug.Log(currentParent);

        }
        if (SC_State.Instance.getState() == SC_State.GM_STATE.FREEZ || SC_State.Instance.getState() == SC_State.GM_STATE.ERROR_USER || SC_State.Instance.getState() == SC_State.GM_STATE.ERROR_SYS) {
            rigitBody.velocity = new Vector2(0, rigitBody.velocity.y);
            rigitBody.rotation = 0f;
        }
       if (SC_State.Instance.getState() == SC_State.GM_STATE.RUNNING)
             HandleMovement();
        if (SC_State.Instance.getState() == SC_State.GM_STATE.END || SC_State.Instance.getState() == SC_State.GM_STATE.ERROR_USER || SC_State.Instance.getState() == SC_State.GM_STATE.ERROR_SYS)
            stop_movment();



    }
    public void zeroRotation() {
       
        
    }
    public float jump() {

        float xLocation = transform.position.x;
        rigitBody.AddForce(Vector3.up * JumpForceThingyCalculator(50.0f, 1f, -9f), ForceMode2D.Impulse);
        inJump = true;
        posJum = xLocation;
        float dis = calculateDistance();
        CS_Log.Instance.WriteJump(dis);
        return xLocation;
    }

    public bool check_return() {
        if (transform.position.y < LimitReturnPoint.position.y) {
            stop_movment();
            return true;
        }
           
        else return false;
    }

    public void current_platform_name() {
        RaycastHit2D raycastHit2d = Physics2D.BoxCast(boxCollider2d.bounds.center, boxCollider2d.bounds.size, 0f, Vector2.down, 1f, platformLayerMask);
        if (raycastHit2d.collider != null)
        {
           
            currentParent = raycastHit2d.collider.transform.parent.ToString();
            isGround = true;
            string save_lavel = get_lavel_platform();
            string[] pureName = currentParent.Split(' ');
            string curr = pureName[0];
            string date = DateTime.Now.ToString();
            if (date != dateNow) {
                CS_Log.Instance.WriteBlock(curr, dateNow);
                dateNow = date;
            }
              
            if (inJump) {
                if (prevParent != currentParent) {
                    CS_Log.Instance.WriteResultJump(GM_JUMP.SUCCESS);
                    inJump = false;
                }
            }
            prevParent = currentParent;
        }
        else {
            
            isGround = false;
            
        }
       
    }
    public  bool check_add_new_platform() {
        RaycastHit2D raycastHit2d = Physics2D.BoxCast(boxCollider2d.bounds.center, boxCollider2d.bounds.size, 0f, Vector2.down, 1f, platformLayerMask);
        if (raycastHit2d.collider != null)
        {
            string currParent = raycastHit2d.collider.transform.parent.ToString();
            statuse = true;
            return true;

        }

        statuse = false;
        return false;    
    }
    private void HandleMovement()
    {
        setSpeed();
        rigitBody.velocity = new Vector2(+moveSpeed, rigitBody.velocity.y);
    }
    public void stop_movment() {
        moveSpeed = 0f;
    }
    public void contunue_momving() {
        setSpeed();
    }

    public void set_player_position(Vector3 pos) {
        transform.position = new Vector3(pos.x, pos.y, pos.z);
        transform.rotation = Quaternion.Euler(0,0,0);
    }
    public float getYpos()
    {
        return transform.position.y;

    }
    public float JumpForceThingyCalculator(float wantedHeight, float weight, float g)
    {
        return weight * Mathf.Sqrt(-2 * wantedHeight * g);
    }
    private float CalculateJumpSpeed(float jumpHeight, float gravity)
    {

        return Mathf.Sqrt(2 * jumpHeight * gravity);
    }
    public void setGravityInit()
    {
        rigitBody.gravityScale = 5.8f;
        return;
    }
    public void setGravity() {

        string[] pureName = currentParent.Split('(');
        string curr = pureName[0];
        curr = curr.Trim();
        if (curr.Contains("_19"))
        {
            rigitBody.gravityScale = 9;
            return;
        }
    
        int speed = SC_jumpSetting.Instance.platformAndSpeed[curr];
        float gap = SC_jumpSetting.Instance.platformAndGap[curr];
        float g =SC_jumpSetting.Instance.getGravity(speed,gap);
        rigitBody.gravityScale = g;
        return;
    }
    public static void PrintDict<K, V>(Dictionary<K, V> dict)
    {
        foreach (K key in dict.Keys)
        {
            Debug.Log(key + " : " + dict[key]);
        }
    }
    public void setSpeed() {
        string[] pureName = currentParent.Split('(');
        string curr = pureName[0];
        curr = curr.Trim();
        moveSpeed = SC_jumpSetting.Instance.platformAndSpeed[curr];
    }
    public bool check_is_ground() {
        return isGround;
    }
    public void freezPlayer() {
        rigitBody.velocity = Vector3.zero;
       
        rigitBody.angularVelocity = 0f;
        rigitBody.rotation = 0f;
        transform.rotation = Quaternion.Euler(0,0,0);
    }
    string get_lavel_platform() {
        string[] pureName = currentParent.Split('(');
        string curr = pureName[0];
        curr = curr.Trim();
        if (curr.EndsWith("_1") || curr.EndsWith("_10") || curr.EndsWith("_13") || curr.EndsWith("_4") || curr.EndsWith("_16") || curr.EndsWith("_7"))
        {
            return "Sort";

        }
        else {
            if (curr.EndsWith("_2") || curr.EndsWith("_11") || curr.EndsWith("_14") || curr.EndsWith("_5") || curr.EndsWith("_8") || curr.EndsWith("_17"))
            {
                return "Middle";

            }
            else {
                return "Long";
            
       
            }
        }
       
    }
    public float calculateDistance()
    {

        string[] pureName = currentParent.Split(' ');
        string curr = pureName[0];
        GameObject g = GameObject.Find(curr);
        Transform childTrans = g.transform.Find("Stable_platform");
        float locStable = childTrans.transform.position.x;
        float ScaleStable = childTrans.transform.lossyScale.x;
        Debug.Log(locStable);
        Debug.Log(ScaleStable);
        float EndStable = locStable + (ScaleStable / 2);
        Debug.Log(EndStable - posJum);
        return (EndStable - posJum);

    }
}
