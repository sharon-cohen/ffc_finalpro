using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
public class SC_SliderControl : MonoBehaviour
{
    // Start is called before the first frame update
    GameObject slider;
    private bool beingHandled = false;
    private static SC_SliderControl instance;
    public static SC_SliderControl Instance
    {
        get
        {
            if (instance == null)
                instance = GameObject.Find("SC_SliderControl").GetComponent<SC_SliderControl>();

            return instance;
        }
    }


    // Update is called once per frame
    public void Start_SC_SliderControl() {
        slider = GameObject.Find("Slider");
    }
    void Update()
    {
        if (SC_State.Instance.getState() == SC_State.GM_STATE.WAIT_SENSOR) { 
            if (!beingHandled)
            {
                StartCoroutine(Reset());
            }
           
    }
    }
    IEnumerator Reset()
    {
        // your process
        beingHandled = true;
        // process pre-yield
        yield return new WaitForSeconds(0.1f);
        // process post-yield
        if (slider.GetComponent<Slider>().value == 10)
            slider.GetComponent<Slider>().value = 1;
        else
            slider.GetComponent<Slider>().value = slider.GetComponent<Slider>().value + 1;
        beingHandled = false;



    }
}
