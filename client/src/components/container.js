import { useState, useEffect } from "react";
import getCustomLocation from "../functions/get-custom-location";
import getCurrentWeather from "../functions/get-current-weather";
import getForecast from "../functions/get-forecast";
import getPlaceNameFromCoords from "../functions/get-placename-from-coords";
import titleCaseString from "../functions/title-case-string";
import Home from "./home";
import Forecast from "./forecast";

export default function Container(props) {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState();
  const [userInput, setUserInput] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [weatherDesc, setWeatherDesc] = useState("");
  const [forecastData, setForecastData] = useState();
  const [sunsetTime, setSunsetTime] = useState("");
  const [sunriseTime, setSunriseTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (location) {
      getWeatherData(location.coords.latitude, location.coords.longitude);
    }
  }, [location]);

  useEffect(() => {
    if (weatherData) {

      setImgUrl(
        `https://openweathermap.org/img/wn/${
          weatherData.weather[0].icon || ""
        }@2x.png`
      );

      const titleDesc = titleCaseString(weatherData.weather[0].description);
      setWeatherDesc(titleDesc);
      // parse sunset time
      const utcSunset = new Date(weatherData.sys.sunset * 1000);
      const localSunset = utcSunset.toLocaleTimeString("en-us", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const localSunsetSplit = localSunset.split(":");
      localSunsetSplit[0] = parseInt(localSunsetSplit[0]);
      const localSunsetParsed = localSunsetSplit.join(":");
      setSunsetTime(localSunsetParsed);
      // parse sunrise time
      const utcSunrise = new Date(weatherData.sys.sunrise * 1000);
      const localSunrise = utcSunrise.toLocaleTimeString("en-us", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const localSunriseSplit = localSunrise.split(":");
      localSunriseSplit[0] = parseInt(localSunriseSplit[0]);
      const localSunriseParsed = localSunriseSplit.join(":");
      setSunriseTime(localSunriseParsed);
      setIsLoading(false);
    }
  }, [weatherData]);

  //   pull latitude/longitude from geolocation object and call setLocation to save coords in state
  async function updateLocation(position) {
    const { latitude, longitude } = position.coords;
    const placeName = await getPlaceNameFromCoords({ latitude, longitude });
    setLocation({ coords: { latitude, longitude }, placeName: placeName.data });
  }

  // uses navigator.geolocation to get user coords, calls updateLocation with the returned coords
  const getLocation = async () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(updateLocation);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  //   calls getCustomLocation to turn userinput (string) into coords that can be used by API
  const useCustomLocation = (event) => {
    event.preventDefault();
    setIsLoading(true);
    getCustomLocation(userInput, setLocation);
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
        temp={weatherData.main.temp}
        humidity={weatherData.main.humidity}
        speed={weatherData.wind.speed}
        forecastData={forecastData}
        sunsetTime={sunsetTime}
        sunriseTime={sunriseTime}
      />
    );
  } else {
    return (
      <Home
        getLocation={getLocation}
        useCustomLocation={useCustomLocation}
        userInput={userInput}
        handleUserInput={handleUserInput}
        isLoading={isLoading}
      />
    );
  }
}
