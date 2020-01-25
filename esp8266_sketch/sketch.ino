#include "DHT.h"
#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <ArduinoJson.h>

#define DHTPIN D1
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);                             //Serial connection
  dht.begin();
  WiFi.begin("ssid", "password");    //WiFi connection
  
  while (WiFi.status() != WL_CONNECTED) {  //Wait for the WiFI connection
 
    delay(500);
    Serial.println("Waiting for connection");
 
  }
   
}

void loop() {

  if (WiFi.status() == WL_CONNECTED){

    float h = dht.readHumidity();
    float t = dht.readTemperature();
    float f = dht.readTemperature(true);

    if (isnan(h) || isnan(t) || isnan(f)) {
      Serial.println("Failed to read from DHT sensor!");
      return;
    }
  
    StaticJsonBuffer<300> JSONbuffer;   //Declaring static JSON buffer
    JsonObject& JSONencoder = JSONbuffer.createObject(); 
 
    JSONencoder["sensorType"] = "Temperature";
 
    JsonArray& values = JSONencoder.createNestedArray("values"); //JSON array
    values.add(h); //Add value to array
    values.add(t); //Add value to array
    
 
    char JSONmessageBuffer[300];
    JSONencoder.prettyPrintTo(JSONmessageBuffer, sizeof(JSONmessageBuffer));
    Serial.println(JSONmessageBuffer);
  
    HTTPClient http;    //Declare object of class HTTPClient
 
    http.begin("http://192.168.0.105:5000/api/v1/data/");      //Specify request destination
    http.addHeader("Content-Type", "application/json");  //Specify content-type header
 
    int httpCode = http.POST(JSONmessageBuffer);   //Send the request
    String payload = http.getString();                                        //Get the response payload
 
    Serial.println(httpCode);   //Print HTTP return code
    Serial.println(payload);    //Print request response payload
 
    http.end();  //Close connection
    
} else {
 
    Serial.println("Error in WiFi connection");
 
  }
 
  delay(5000);  //Send a request every 1 minute
}
