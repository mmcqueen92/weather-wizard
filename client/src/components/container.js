import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationCrosshairs,
  faHatWizard,
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";
import getCustomLocation from "../functions/get-custom-location";
import getCurrentWeather from "../functions/get-current-weather";
import getForecast from "../functions/get-forecast";
import getPlaceNameFromCoords from "../functions/get-placename-from-coords";
import titleCaseString from "../functions/title-case-string";
import ForecastList from "./forecast-list";

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
      <div className="border-4 border-blue-800 rounded-md max-w-2xl mx-auto bg-blue-300 p-2">
        <div className="flex flex-row justify-start">
          <button
            onClick={back}
            className="border-2 border-blue-800 rounded-md p-1 w-9 hover:bg-blue-800 text-blue-800 hover:text-slate-200"
          >
            <FontAwesomeIcon
            icon={faArrowLeft}
            ></FontAwesomeIcon>
          </button>
        </div>
        <h5 className="font-bold text-lg">{location.placeName}</h5>
        <div className="flex flex-row items-center">
          <div className="flex flex-col items-center w-1/2">
            <h5>{weatherDesc}</h5>
            <img
              src={imgUrl}
              alt="Weather Icon"
              crossOrigin="true"
              className="flex h-20 w-20 bg-blue-300"
            ></img>
          </div>
          <div className="flex flex-col w-1/2 h-max">
            <h6>Temperature: {weatherData.main.temp}</h6>
            <h6>Humidity: {weatherData.main.humidity}%</h6>
            <h6>Wind: {weatherData.wind.speed} m/s</h6>
          </div>
        </div>
        <div className="flex flex-col overflow-auto mt-5 border-2 border-blue-800 rounded-md">
          <ForecastList forecastData={forecastData}></ForecastList>
        </div>
      </div>
    );
  } else {
    return (
      <div className="border-4 border-blue-800 rounded-md max-w-md mx-auto bg-blue-300 p-2">
        <h3>Welcome to Weather-Wizard</h3>
        <FontAwesomeIcon
          icon={faHatWizard}
          size="2xl"
          className="text-blue-800"
        ></FontAwesomeIcon>
        <br />
        <label htmlFor="user_loc">Use current location: </label>
        <button
          name="user_loc"
          onClick={getLocation}
          className="border-2 border-blue-800 m-1 p-1 rounded-md h-9 w-9 text-blue-800 hover:bg-blue-800 hover:text-slate-200"
        >
          <FontAwesomeIcon icon={faLocationCrosshairs}></FontAwesomeIcon>
        </button>
        <form onSubmit={useCustomLocation}>
          <label htmlFor="enter_city">Enter a location: </label>
          <input
            type="text"
            id="enter_city"
            name="enter_city"
            value={userInput}
            onChange={(event) => {
              setUserInput(event.target.value);
            }}
            className="border-2 border-blue-800 m-1 p-1 rounded-md"
            required
          ></input>
          <button
            type="submit"
            className="border-2 border-blue-800 m-1 p-1 rounded-md hover:bg-blue-800 hover:text-slate-200"
          >
            Search
          </button>
        </form>
      </div>
    );
  }
}
