import axios from 'axios'

export default function getCustomLocation(userInput) {
  // use user input (string) to get coords
    const tempUserInput = 'montreal'
    axios.get(`http://localhost:3001/here?address=${tempUserInput}`)
    .then((res) => {
      console.log(res.data)
      return res.data
    })
    .catch((err) => {
      console.log("error: ", err)
    })

};

// module.exports = {
//   getCustomLocation
// };


