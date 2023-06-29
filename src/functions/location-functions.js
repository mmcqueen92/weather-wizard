const getCustomLocation = (location) => {
  // use user input (string) to get coords

  //temp code below
  console.log("returned custom location");
  return { lat: 49.246292, long: -123.116226 };
};

module.exports = {
  getUserLocation,
  getCustomLocation,
};
