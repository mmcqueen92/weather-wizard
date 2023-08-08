import { useState, useEffect } from "react";
import getCustomLocation from "../functions/get-custom-location";
import getCurrentWeather from "../functions/get-current-weather";
import getForecast from "../functions/get-forecast";
import getPlaceNameFromCoords from "../functions/get-placename-from-coords";
import titleCaseString from "../functions/title-case-string";
import Home from "./home";
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

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
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
      <Home
        getLocation={getLocation}
        useCustomLocation={useCustomLocation}
        userInput={userInput}
        handleUserInput={handleUserInput}
      />
    );
  }
}
