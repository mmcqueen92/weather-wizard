import axios from 'axios'

export default async function getCustomLocation(userInput, setState) {
  // use user input (string) to get coords
    const tempUserInput = 'montreal'
    axios.get(`http://localhost:3001/here?address=${tempUserInput}`)
    .then((res) => {
      const latitude = res.data.lat;
      const longitude = res.data.lng;
      setState({latitude, longitude})
      return res
    })
    .catch((err) => {
      console.log("error: ", err)
    })

};

// module.exports = {
//   getCustomLocation
// };


