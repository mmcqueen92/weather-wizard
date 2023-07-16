export default function ForecastListItem(props) {
  // parse time
  const dateAndTime = props.forecast.dt_txt;

  // 2023-07-15
  const date = dateAndTime.split(" ")[0];
  const year = Number(date.split("-")[0]);
  const month = Number(date.split("-")[1]);
  const day = Number(date.split("-")[2]);

  //  03:00:00
  const time = dateAndTime.split(" ")[1];
  const hour = Number(time.split(":")[0]);
  const minute = Number(time.split(":")[1]);
  const second = Number(time.split(":")[2]);

  const utcDate = new Date(Date.UTC(year, month, day, hour, minute, second));
  const localDate = utcDate.toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "full",
  });

  return (
    <div className="border-2 border-blue-800 m-1 p-1 rounded-md bg-green-200">
      <br />
      <h4>Forecast list item:</h4>
      <div>
        <h6>LOCAL DATE/TIME: {localDate}</h6>
        <h6>TEMP: {props.forecast.main.temp}</h6>
        <h6>DESC: {props.forecast.weather[0].description}</h6>
      </div>
    </div>
  );
}

// original time
// 2023-07-15 03:00:00

// example date
// var utcDate = new Date(Date.UTC(2022, 3, 19, 8, 20, 49));

// example to local
// var localDate = utcDate.toLocaleString("en-US", {
//     dateStyle: "full",
//     timeStyle: "full"
//   });
