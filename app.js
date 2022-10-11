//jshint esversion:6
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3030; //change the port with this val.


app.get("/", function (req, res) {
    res.sendFile(`${__dirname}/index.html`);
    
});


app.post("/success", function (req, res) {
    let query = req.body.cityName;//get another query's info with changing this val.
    const unit = "metric";
    const apiKey = "fc8e559eb1dd43705a654e7239ae2c09";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${unit}&appid=${apiKey}`;
    
    https.get(url, function (_res) {
        console.log(_res.statusCode);

        _res.on("data", function (data) {
            const weatherData = JSON.parse(data);
            if (_res.statusCode === 404) {
                res.send("City not found...");
            }
            const weatherDescription = weatherData.weather[0].description;
            const iconURL = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
            const temp = Math.round(weatherData.main.temp * 10) / 10;
            
            res.write(`<p><img src="${iconURL}"></p>`);
            res.write(`<p><br>The weather is currently <b>${weatherDescription}</b>.</p>`);
            res.write(`<p style="font-size: 1.2rem;">The temperature in <i>${query}</i> is <b>${temp}c</b>.</p>`);
            res.send();
            
        });
    });
    console.log("already posted!");
})


app.listen(port, function () {
    console.log(`Server successfuly started on port ${port}...`);

});

//nurex ivision gnsee 