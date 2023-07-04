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
    getWeatherData(latitude, longitude)
  }

  // uses navigator.geolocation to get user coords, calls updateLocation with the returned coords
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(updateLocation);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  //   calls getCustomLocation to turn userinput (string) into coords that can be used by API
  const useCustomLocation = () => {
    getCustomLocation("montreal", setLocation, getWeatherData)
  };

  // const getLocAndWeather = async () => {

  // }

  // const useUserLocation = async () => {
  //   getLocation()
  // }

  const getWeatherData = async (lat, long) => {
    // api call to get weatherdata from coords
    const coords = {latitude: lat, longitude: long}

    await getCurrentWeather(coords).then((res) => {
        setWeatherData(res);
      });


  };

  if (location) {
    return (
      <div>
        <h4>LOCATION SELECTED!</h4>
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
        <h4>NO LOCATION SELECTED</h4>
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
