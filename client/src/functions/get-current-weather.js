import axios from 'axios';

export default function getCurrentWeather(location) {
    axios
    .get(`http://localhost:3001/openweather/current?lat=${location.lat}&long=${location.long}`)
    .then((response) => {
        return response
    })
    .catch((err) => {
        console.log(err)
    })
}

