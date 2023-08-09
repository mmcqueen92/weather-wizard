import axios from 'axios'

export default async function getCustomLocation(userInput, setState) {
  // use user input (string) to get coords
    
    const encodedUserInput = encodeURIComponent(userInput)
    const axiosPromise = await axios.get(`http://localhost:3001/here?address=${encodedUserInput}`)
    .then((res) => {
      const latitude = res.data.coords.lat;
      const longitude = res.data.coords.lng;
      const placeName = res.data.placeName;
      const locationData = {coords: {latitude, longitude}, placeName}
      setState(locationData)
      return res.data
    })
    .catch((err) => {
      console.log("error: ", err)
    })
    return axiosPromise
};

