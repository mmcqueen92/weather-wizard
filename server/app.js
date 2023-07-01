const axios = require("axios");
const express = require("express");
const app = express();
const cors = require("cors");
let dotenv = require("dotenv").config();
const HERE_API_KEY = process.env.HERE_API_KEY;

app.use(cors());

app.get("/here", (req, res, next) => {

  const address = req.query.address;
  axios
    .get(
      `https://geocode.search.hereapi.com/v1/geocode?q=${address}&apiKey=${HERE_API_KEY}`
    )
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.log("error inside the server");
      console.log(err);
    });
});

app.listen(3001, () => {
  console.log("listening on port 3001");
});

// EXAMPLE HERE API CALL

// https://geocode.search.hereapi.com/v1/geocode
// ?q=240+Washington+St.%2C+Boston
// &limit=4
// &apiKey={YOUR_API_KEY}
