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
  //temp code below
  console.log("returned custom location");
  return { lat: 49.246292, long: -123.116226 };
};

// module.exports = {
//   getCustomLocation
// };


