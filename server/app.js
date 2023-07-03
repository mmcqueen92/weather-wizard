const axios = require("axios");
const express = require("express");
const app = express();
const cors = require("cors");
let dotenv = require("dotenv").config();
const HERE_API_KEY = process.env.HERE_API_KEY;
const OW_API_KEY = process.env.OW_API_KEY

app.use(cors());

// returns coords of a given location (string)
app.get("/here", (req, res) => {

  const address = req.query.address;
  axios
    .get(
      `https://geocode.search.hereapi.com/v1/geocode?q=${address}&apiKey=${HERE_API_KEY}`
    )
    .then((response) => {
      res.send(response.data.items[0].position);
    })
    .catch((err) => {
      console.log("error inside the server");
      console.log(err);
    });
});

app.get("/openweather/current", (req, res) => {
    const lat = req.query.lat
    const long = req.query.long
    axios
        .get( `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${OW_API_KEY}`)
        .then((response) => {
            res.send(response.data)
        })
        .catch((err) => {
            console.log(err)
        })

})

app.listen(3001, () => {
  console.log("listening on port 3001");
});