import axios from 'axios'

export default async function getCustomLocation(userInput, setState, getData) {
  // use user input (string) to get coords
    
    const encodedUserInput = encodeURIComponent(userInput)
    console.log("calling: ", `http://localhost:3001/here?address=${encodedUserInput}`)
    const axiosPromise = await axios.get(`http://localhost:3001/here?address=${encodedUserInput}`)
    .then((res) => {
      const latitude = res.data.lat;
      const longitude = res.data.lng;
      setState({latitude, longitude})
      return res.data
    })
    .then((res) => {
      const latitude = res.lat;
      const longitude = res.lng;
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


