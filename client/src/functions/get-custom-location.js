import axios from 'axios'

export default async function getCustomLocation(userInput, setStateFunction) {
  // use user input (string) to get coords
    const tempUserInput = 'montreal'
    axios.get(`http://localhost:3001/here?address=${tempUserInput}`)
    .then((res) => {
      console.log(res.data)
      setStateFunction(res.data)
      return res.data
    })
    .catch((err) => {
      console.log("error: ", err)
    })

};

// module.exports = {
//   getCustomLocation
// };


