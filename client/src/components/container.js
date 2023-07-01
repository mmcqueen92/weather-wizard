import { useState, useEffect } from "react";
import {
  getCustomLocation,
} from "../functions/location-functions";

export default function Container(props) {
  const [location, setLocation] = useState();
  const [weatherData, setWeatherData] = useState();


//   pull latitude/longitude from geolocation object
  function updateLocation(position) {
    console.log("Latitude: " + position.coords.latitude);
    console.log("Longitude: " + position.coords.longitude);
    const { latitude, longitude } = position.coords;
    setLocation({ latitude, longitude })
  }

  // set location to user coords
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(updateLocation);
    } else {
      console.log("Geolocation is not supported by this browser.")
    }
  }

  //   set location based on user input
  const useCustomLocation = (location) => {
    setLocation(getCustomLocation(location));
  };

//   const getWeatherData = (coords) => {
//     // api call to get weatherdata from coords
//   };



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
          <div>{location.latitude}</div>
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
      </div>
    );
  }
}
