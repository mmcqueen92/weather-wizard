const getUserLocation = () => {
  // get user coords
  // get address/city from coords
  // return city/coords depending on API needs

  //   temp code below
  console.log("returned user location");
  return {lat: 49.246292, long: -123.116226}
}

const getCustomLocation = (location) => {

    console.log("returned custom location");
    return {lat: 49.246292, long: -123.116226}
}

module.exports = {
  getUserLocation,
  getCustomLocation
}
