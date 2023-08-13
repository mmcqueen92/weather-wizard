import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ForecastList from "./forecast-list";

export default function Forecast(props) {
  const { placeName, back, weatherDesc, imgUrl, weatherData, forecastData } =
    props;
  return (
    <div className="border-4 border-blue-800 rounded-md max-w-2xl mx-auto bg-blue-300 p-2 relative">
      <h5 className="font-bold text-lg text-blue-800">{placeName}</h5>
      <div className="flex flex-row justify-start">
        <button
          onClick={back}
          className="border-2 border-blue-800 rounded-md p-1 w-9 bg-blue-800 hover:bg-blue-200 hover:text-blue-800 text-slate-200 absolute top-1 left-1"
        >
          <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
        </button>
      </div>
      <div className="flex flex-row items-center">
        <div className="flex flex-col items-center w-1/2">
          <h5 className="font-medium text-blue-800">{weatherDesc}</h5>
          <img
            src={imgUrl}
            alt="Weather Icon"
            crossOrigin="true"
            className="flex h-20 w-20 bg-blue-300"
          ></img>
        </div>
        <div className="flex flex-col w-1/2 h-max text-blue-800 font-medium">
          <h6>Temperature: {weatherData.main.temp}&#8451;</h6>
          <h6>Humidity: {weatherData.main.humidity}%</h6>
          <h6>Wind: {weatherData.wind.speed} m/s</h6>
        </div>
      </div>
      <div className="flex flex-col overflow-auto mt-5 border-2 border-blue-800 bg-blue-500 rounded-md shadow-xl">
        <ForecastList forecastData={forecastData}></ForecastList>
      </div>
    </div>
  );
}
