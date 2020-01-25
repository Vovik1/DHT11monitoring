# DHT11monitoring
DHT11 sensor monitoring using RESTful API and Chart.js. Flask was used to create RESTful web service.
In this project the notification mail will be sent to 'FLASKY_ADMIN' if the average of last 10 temperature 
values from DHT sensor would be higher than 45° C. 

### Prerequisites
Install all necessary packages for your virtual environment
```
(venv) $ pip install -r requirements.txt
```
### Installing
Go to your Google account settings page and select “Signing in to Google” from the left menu bar. 
On that page, locate the “Allow less secure apps” setting and make sure it is enabled.
The two environment variables that hold the email server username and password  need to be defined in the environment
```
(venv) $ export MAIL_USERNAME=<Gmail username>
(venv) $ export MAIL_PASSWORD=<Gmail password>
```
The recipient of the email is given in the FLASKY_ADMIN environment variable
```
(venv) $ export FLASKY_ADMIN=<Gmail username>
```
Start the web server as follows
```
(venv) $ export FLASK_APP=flasky.py
(venv) $ flask run --host 0.0.0.0
```
The web server should now be accessible from any computer in the network at http://a.b.c.d:5000, 
where a.b.c.d is the IP address of the computer running the server in your network.

Connect your DHT11 to ESP8622. Type correct ip-address(a.b.c.d) at line 54 and WIFI settings 
at line 14 of esp8266_sketch/sketch.ino

Change ip-address(a.b.c.d) in charts/script.js at line 62 and 77.

Open index.html file in your browser
```
(venv) $ google-chrome charts/index.html
```

## Authors

* **Volodymyr Hrytsiv**
