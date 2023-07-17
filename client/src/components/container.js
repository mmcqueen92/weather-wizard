import { useState, useEffect } from "react";
import getCustomLocation from "../functions/get-custom-location";
import getCurrentWeather from "../functions/get-current-weather";
import getForecast from "../functions/get-forecast";
import getPlaceNameFromCoords from "../functions/get-placename-from-coords";
import ForecastList from "./forecast-list"

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

      const descArray = weatherData.weather[0].description.split(" ");
      const parsedArray = descArray.map((word) => {
        const newWord = word[0].toUpperCase() + word.substring(1);
        return newWord;
      });
      const descString = parsedArray.join(" ");
      setWeatherDesc(descString);
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
      <div>
        <button onClick={back}>Back</button>
        <h4>LOCATION SELECTED!</h4>
        <h5>{location.placeName}</h5>
        <div>
          <h5>Current Weather: {weatherDesc}</h5>
          <img src={imgUrl} alt="Weather Icon" crossOrigin="true"></img>
          <h6>Temperature: {weatherData.main.temp}</h6>
          <h6>Humidity: {weatherData.main.humidity}%</h6>
          <h6>Wind: {weatherData.wind.speed} m/s</h6>
        </div>
        <h5>
          <ForecastList
          forecastData={forecastData}
          ></ForecastList>
        </h5>
        
      </div>
    );
  } else {
    return (
      <div className="border-2 border-blue-800 rounded-md max-w-md my-5 mx-auto">
        <h4>NO LOCATION SELECTED</h4>
        <button onClick={getLocation} className="border-2 border-blue-800 m-1 p-1 rounded-md">User location</button>
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
            className="border-2 border-blue-800 m-1 p-1 rounded-md"
            required
          ></input>
          <button type="submit" className="border-2 border-blue-800 m-1 p-1 rounded-md">Search</button>
        </form>
      </div>
    );
  }
}
