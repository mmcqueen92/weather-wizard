import { useState } from "react";
import getCustomLocation from "../functions/get-custom-location";
import getCurrentWeather from "../functions/get-current-weather";

export default function Container(props) {
  const [location, setLocation] = useState();
  const [weatherData, setWeatherData] = useState();
  const [userInput, setUserInput] = useState("");

  //   pull latitude/longitude from geolocation object and call setLocation to save coords in state
  function updateLocation(position) {
    const { latitude, longitude } = position.coords;
    setLocation({ latitude, longitude });
    getWeatherData(latitude, longitude);
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
  const useCustomLocation = (event) => {
    event.preventDefault();
    console.log("useCustomLocation called with userInput = ", userInput);
    getCustomLocation(userInput, setLocation, getWeatherData);
  };

  const getWeatherData = async (lat, long) => {
    // api call to get weatherdata from coords
    const coords = { latitude: lat, longitude: long };

    await getCurrentWeather(coords).then((res) => {
      setWeatherData(res);
    });
  };

  const back = () => {
    setWeatherData();
  };

  if (weatherData) {
    return (
      <div>
        <button onClick={back}>Back</button>
        <h4>LOCATION SELECTED!</h4>
        <div>
          <h5>Current Weather</h5>
          <h6>Weather Icon</h6>
          <h6>Weather Info</h6>
        </div>
        <div>
          <h5>Hours/Days</h5>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h4>NO LOCATION SELECTED</h4>
        <button onClick={getLocation}>User location</button>
        <form onSubmit={useCustomLocation}>
          <label htmlFor="enter_city">Enter a location</label>
          <input
            type="text"
            id="enter_city"
            name="enter_city"
            value={userInput}
            onChange={(event) => {
              setUserInput(event.target.value);
            }}
          ></input>
          <button type="submit">Custom location</button>
        </form>
      </div>
    );
  }
}
