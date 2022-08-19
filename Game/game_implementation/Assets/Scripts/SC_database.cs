using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using MongoDB.Driver;
using MongoDB.Bson;
using System;

public class SC_database : MonoBehaviour
{
    public const int HOURE_MILISECONDS = 3600000;
    const string MONGO_URI = "mongodb+srv://user:user123@cluster0.cwowy.mongodb.net/database?retryWrites=true&w=majority";
    private const string DATABASE_NAME = "database";
    private MongoClient client;
    private IMongoDatabase db;
    private string _code;
    private string _dataTest;
    private static SC_database instance;
    public static SC_database Instance
    {
        get
        {
            if (instance == null)
                instance = GameObject.Find("SC_database").GetComponent<SC_database>();

            return instance;
        }
    }

    void Start()
    {
        



    }

    public bool connect_to_the_server()
    {

        try
        {
            client = new MongoClient(MONGO_URI);
            db = client.GetDatabase(DATABASE_NAME);
            return true;

        }

        catch (Exception e)
        {
            Debug.Log("error");
            return false;
        }

    }
    public bool check_exsist_test(string code)
    {
        IMongoCollection<Users> userCollection = db.GetCollection<Users>("tests");
        List<Users> userModelList = userCollection.Find(user => true).ToList();
        foreach (var test in userModelList)
        {
            if (test.code == code)
            {
                _code = test.code;
                _dataTest = test.date;
                Debug.Log("_dataTest");
                Debug.Log(_dataTest);
                    
                return true;
            }
        }
        
        return false;
    }
    public bool check_time_test()
    {

        long dateGame = (long)Convert.ToDouble(_dataTest);
        long milliseconds = DateTimeOffset.Now.ToUnixTimeMilliseconds();
      
        Debug.Log((milliseconds - dateGame).ToString());
        if (milliseconds - dateGame >= 0)
        {
            if (milliseconds - dateGame <= HOURE_MILISECONDS)
            {
                return true;
            }
            else {
              
                return false;
            }
        }
        else {
         
            return false;
        }
        
    }

    public string get_test_date() { return _dataTest; }
    void set_log_sensor() { }
    void set_log_game() { }
    public void save_sensor_log(List<string> sensorLog) {
        
        Debug.Log("log save sensor");
        IMongoCollection<Users> userCollection = db.GetCollection<Users>("tests");
        userCollection.UpdateMany(user => user.code == _code, Builders<Users>.Update.Set(user => user.sensorLog, sensorLog));
        Debug.Log("log save sensor finish");
           
    return;
    }
    public void save_game_log(List<string> gameLog)
    {
        
       Debug.Log("log save game");
       IMongoCollection<Users> userCollection = db.GetCollection<Users>("tests");
       userCollection.UpdateMany(user => user.code == _code, Builders<Users>.Update.Set(user => user.gameLog, gameLog));
       Debug.Log("log save game finish");

       
        return;
    }

}
public class Users
{
    public ObjectId _id { set; get; }
    public List<object> foodGuide { set; get; }
    public string status { get; set; }
    public string testName { get; set; }
    public string code { get; set; }
    public string date { get; set; }
    public ObjectId patient { set; get; }
    public List<string> gameLog { get; set; }
    public List<string> sensorLog { get; set; }
    public int __v { get; set; }
    public String doctor { set; get; }
    public string confirmationStatus { set; get; }
    public DateTime createdAt { set; get; }
    public DateTime updatedAt { set; get; }


}
