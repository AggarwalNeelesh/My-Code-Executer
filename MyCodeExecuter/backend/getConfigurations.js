const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://judge0-ce.p.rapidapi.com/config_info',
  headers: {
    'X-RapidAPI-Key': 'd476650112mshce9dbca70399f75p1f18a8jsn398ffe13c414',
    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
  }
};

axios.request(options)
.then(response=>console.log(response.data))
.catch(error=>console.log(error))