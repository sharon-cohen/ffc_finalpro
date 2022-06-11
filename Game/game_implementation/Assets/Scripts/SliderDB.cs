using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
public class SliderDB : MonoBehaviour
{
    // Start is called before the first frame update
    public bool activeSlider = false;

    // Update is called once per frame
    void Update()
    {
        if (activeSlider)
        {
            if (gameObject.GetComponent<Slider>().value == 10)
                gameObject.GetComponent<Slider>().value = 1;
            else
                gameObject.GetComponent<Slider>().value = gameObject.GetComponent<Slider>().value + 1;
        }
    }
}
