import axios from 'axios';

export default async function getCurrentWeather(location) {
    return await axios
    .get(`http://localhost:3001/openweather/current?lat=${location.latitude}&long=${location.longitude}`)
    .then((response) => {
        return response.data
    })
    .catch((err) => {
        console.log("ERROR IN GETCURRENTWEATHER")
        console.log(err)
    })
}

