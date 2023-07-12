import axios from 'axios';

export default async function getForecast(location) {
    return await axios
    .get(`http://localhost:3001/openweather/forecast?lat=${location.latitude}&long=${location.longitude}`)
    .then((response) => {
        return response.data
    })
    .catch((err) => {
        console.log("ERROR IN getForecast")
        console.log(err)
    })
}