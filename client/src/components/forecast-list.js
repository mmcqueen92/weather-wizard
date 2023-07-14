import ForecastListItem from "./forecast-list-item";

export default function ForecastList(props) {
  const itemArray = props.forecastData.list.map((element, index) => {
    return (
      <ForecastListItem
        key={index}
        forecast={element}
        timezone={props.forecastData.city.timezone}
      ></ForecastListItem>
    );
  });

  return <div>{itemArray}</div>;
}
