const express = require("express");
const https = require("https");
const app = express();
const path = require("path");
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  var dir = path.join(__dirname, "../index.html");
  res.sendFile(dir);
});
app.post("/", (req, res) => {
  const query = req.body.cityName;
  const appid = "f13476c459551e9f2fd3d14a87ef8df3";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appid + "&units=" + units;
  https.get(url, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temperature = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      //const imgUrl = "http://openweathermap.org/img/wn/01n@2x.png";
      res.write("<h1>La termperatura en" + query + " es: " + temperature + " grados celsius</h1>");
      res.write("<p>El clima actualmente esta " + weatherDescription + "</p>");
      res.write("<img src=" + imgUrl + ">");
      res.send();
    });
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
