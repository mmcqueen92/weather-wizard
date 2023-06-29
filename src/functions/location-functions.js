const getUserLocation = async () => {
  // get user coords

  if ("geolocation" in navigator) {
    let returnObj = {};
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      console.log("big shpoople: ", coords);
      const { latitude, longitude } = coords;
      returnObj = { latitude, longitude };

    });
    return returnObj;
  } else {
    console.log("navigator not available");
    return;
  }
  //   temp code below
  //   console.log("returned user location");
  //   return {lat: 49.246292, long: -123.116226}
};

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
