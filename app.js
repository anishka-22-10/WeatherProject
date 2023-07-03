const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true })); 

app.get("/",function(req, res){
    res.sendFile(__dirname + "/index.html");
});

    app.post("/", function(req, res){
        var city = req.body.cityName;
    //    console.log(req.body.cityName);
        https.get("https://api.openweathermap.org/data/2.5/weather?q="+ city +",india&appid=ca64f6c1fc73b0540b1318b446de3955", function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
        const js = JSON.parse(data);
        console.log(js);
        // to display the temperature
        const temp = js.main.temp - 273;
        const weatherDescription = js.weather[0].description;
        const icon = js.weather[0].icon;
        const imageURL = "https://openweathermap.org/img/wn/" +icon+ "@2x.png";
        console.log(temp);
        res.write("<h1>The temperature in " + city + " is " + temp + " degree Celcius  </h1>");
        res.write("<p>The Weather is currently " + weatherDescription +"</p>");
        res.write("<img src =" + imageURL + ">" );
        res.send();
    })
    })

})
   // app.get("/", function(req, res){

    
// });
app.listen(3001,function(){
    console.log("SERVER STARTED ON 3001 PORT NUMBER");
})