const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
dotenv.config();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('This is a weather app server')
});

let port = process.env.PORT || 4001;

app.listen(port, () => {
    console.log(`App running on port ${port} `);
});

let apiUrl;

app.post('/search-location', (req, res) => {
  console.log(dotenv.config());
  console.log(req.body);
  let zip = req.body.zip;
  let baseUrl = `http://api.openweathermap.org/data/2.5/forecast?`,
    // apiKey = `&appid=${process.env.REACT_APP_WEATHER_API_KEY}`,
    apiKey = `&appid=0a060524e5ecf249d14496f85afba19e`
    // coordinates = `lat=` + coord.latitude + `&lon=` + coord.longitude;
    zipCode = `zip=${zip},`
  apiUrl = baseUrl + zipCode + apiKey;
  console.log('apiUrl is ' + apiUrl)
  axios.get(apiUrl)
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      console.log('error is ' + error);
    });
});

app.get('/weather', (req, res) => {
  axios.get(apiUrl)
    .then(response => {
      //Data logic
      res.json(response.data);
    })
    .catch(error => {
      console.log(error);
      console.log('search location error');
    });
});