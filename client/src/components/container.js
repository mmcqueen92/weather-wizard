import { useState } from "react";
import getCustomLocation from "../functions/get-custom-location";
import getCurrentWeather from "../functions/get-current-weather";

export default function Container(props) {
  const [location, setLocation] = useState();
  const [weatherData, setWeatherData] = useState();

  //   pull latitude/longitude from geolocation object and call setLocation to save coords in state
  function updateLocation(position) {
    console.log("POSITION: ", position);
    const { latitude, longitude } = position.coords;
    setLocation({ latitude, longitude });
  }

  // uses navigator.geolocation to get user coords, calls updateLocation with the returned coords
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(updateLocation);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  //   calls getCustomLocation to turn userinput (string) into coords that can be used by API
  const useCustomLocation = async () => {
    getCustomLocation("montreal", setLocation)




    // setLocation()

    // setLocation({
    //   latitude: latLong.lat,
    //   longitude: latLong.long,
    // });
  };

  const getWeatherData = async () => {
    // api call to get weatherdata from coords
    if (location) {
      getCurrentWeather(location).then((res) => {
        setWeatherData(res);
      });
    } else {
      console.log("please select a location");
    }
  };

  if (location) {
    return (
      <div>
        <h4>This is ACTIVE!</h4>
        <div>
          <h5>Current Weather</h5>
          <h6>Weather Icon</h6>
          <h6>Weather Info</h6>
        </div>
        <div>
          <h5>Hours/Days</h5>
        </div>
        <div>
          <h5>Coords?</h5>
          <div>LAT: {location.latitude}</div>
          <div>LONG: {location.longitude}</div>
        </div>
        <div>
          <button onClick={getWeatherData}>Get Current Weather</button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h4>This is INACTIVE!</h4>
        <button onClick={getLocation}>User location</button>
        <div>
          <label htmlFor="enter_city">Enter a location</label>
          <input type="text" id="enter_city" name="enter_city"></input>
          <button onClick={useCustomLocation}>Custom location</button>
        </div>
        <div>
          <button onClick={getCurrentWeather}>Get Current Weather</button>
        </div>
      </div>
    );
  }
}
