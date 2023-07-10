import axios from 'axios'

export default async function getCustomLocation(userInput, setState, getData) {
  // use user input (string) to get coords
    
    const encodedUserInput = encodeURIComponent(userInput)
    const axiosPromise = await axios.get(`http://localhost:3001/here?address=${encodedUserInput}`)
    .then((res) => {
      console.log("res.data: ", res.data)
      const latitude = res.data.coords.lat;
      const longitude = res.data.coords.lng;
      const placeName = res.data.placeName;
      const locationData = {coords: {latitude, longitude}, placeName}
      setState(locationData)
      return res.data
    })
    .then((res) => {
      console.log("line 18 res: ", res)
      const latitude = res.coords.lat;
      const longitude = res.coords.lng;
      getData(latitude, longitude)
    })
    .catch((err) => {
      console.log("error: ", err)
    })
    return axiosPromise
};

// module.exports = {
//   getCustomLocation
// };


