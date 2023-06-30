const getCustomLocation = (location) => {
  // use user input (string) to get coords
    const geocoder = new google.maps.Geocoder();
  //temp code below
  console.log("returned custom location");
  return { lat: 49.246292, long: -123.116226 };
};

module.exports = {
  getCustomLocation
};


// EXAMPLE HERE API CALL

// https://geocode.search.hereapi.com/v1/geocode
// ?q=240+Washington+St.%2C+Boston
// &limit=4
// &apiKey={YOUR_API_KEY}