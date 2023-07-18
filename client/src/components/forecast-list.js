import ForecastListItem from "./forecast-list-item";

export default function ForecastList(props) {
  const forecastArray = props.forecastData.list
  const oneDayForecast = forecastArray.slice(0,8)
  const itemArray = oneDayForecast.map((element, index) => {
    return (
      <ForecastListItem
        key={index}
        forecast={element}
        timezone={props.forecastData.city.timezone}
      ></ForecastListItem>
    );
  });

  return (
  <div className="flex flex-row">
    {itemArray}
    </div>
    );
}
