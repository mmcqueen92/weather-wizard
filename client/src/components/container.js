import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationCrosshairs,
  faHatWizard,
} from "@fortawesome/free-solid-svg-icons";
import getCustomLocation from "../functions/get-custom-location";
import getCurrentWeather from "../functions/get-current-weather";
import getForecast from "../functions/get-forecast";
import getPlaceNameFromCoords from "../functions/get-placename-from-coords";
import titleCaseString from "../functions/title-case-string";

import Forecast from "./forecast";

export default function Container(props) {
  const [location, setLocation] = useState();
  const [weatherData, setWeatherData] = useState();
  const [userInput, setUserInput] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [weatherDesc, setWeatherDesc] = useState("");
  const [forecastData, setForecastData] = useState();

  useEffect(() => {
    if (weatherData) {
      setImgUrl(
        `https://openweathermap.org/img/wn/${
          weatherData.weather[0].icon || ""
        }@2x.png`
      );

      const titleDesc = titleCaseString(weatherData.weather[0].description);
      setWeatherDesc(titleDesc);
    }
  }, [weatherData]);

  //   pull latitude/longitude from geolocation object and call setLocation to save coords in state
  async function updateLocation(position) {
    const { latitude, longitude } = position.coords;
    const placeName = await getPlaceNameFromCoords({ latitude, longitude });
    setLocation({ coords: { latitude, longitude }, placeName: placeName.data });
    getWeatherData(latitude, longitude);
  }

  // uses navigator.geolocation to get user coords, calls updateLocation with the returned coords
  const getLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(updateLocation);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  //   calls getCustomLocation to turn userinput (string) into coords that can be used by API
  const useCustomLocation = (event) => {
    event.preventDefault();
    getCustomLocation(userInput, setLocation, getWeatherData);
  };

  const getWeatherData = async (lat, long) => {
    // api call to get weatherdata from coords
    const coords = { latitude: lat, longitude: long };

    await getCurrentWeather(coords).then((res) => {
      setWeatherData(res);
    });

    await getForecast(coords).then((res) => {
      setForecastData(res);
    });
  };

  const back = () => {
    setWeatherData();
  };

  if (weatherData && forecastData) {
    return (
      <Forecast
        placeName={location.placeName}
        back={back}
        weatherDesc={weatherDesc}
        imgUrl={imgUrl}
        weatherData={weatherData}
        forecastData={forecastData}
      />
    );
  } else {
    return (
      <div className="border-4 border-blue-800 rounded-md max-w-md mx-auto bg-blue-300 p-2">
        <div className="relative">
          <h3 className="text-blue-800 font-bold">Welcome to Weather-Wizard</h3>
          <FontAwesomeIcon
            icon={faHatWizard}
            // size="3xl"
            className="text-blue-800 absolute top-5 right-5 fa-3x"
          ></FontAwesomeIcon>
        </div>

        <br />
        <label htmlFor="user_loc" className="text-blue-800 font-medium">
          Use current location:{" "}
        </label>
        <button
          name="user_loc"
          onClick={getLocation}
          className="border-2 border-blue-800 m-1 p-1 rounded-md h-9 w-9 bg-blue-200 hover:bg-blue-800 hover:text-blue-200 text-blue-800"
        >
          <FontAwesomeIcon icon={faLocationCrosshairs}></FontAwesomeIcon>
        </button>
        <form onSubmit={useCustomLocation}>
          <input
            type="text"
            id="enter_city"
            name="enter_city"
            placeholder="Enter a Location"
            value={userInput}
            onChange={(event) => {
              setUserInput(event.target.value);
            }}
            className="border-2 border-blue-800 m-1 p-1 rounded-md"
            required
          ></input>
          <button
            type="submit"
            className="border-2 border-blue-800 m-1 p-1 rounded-md bg-blue-200 hover:bg-blue-800 hover:text-blue-200 text-blue-800 font-medium"
          >
            Search
          </button>
        </form>
      </div>
    );
  }
}
