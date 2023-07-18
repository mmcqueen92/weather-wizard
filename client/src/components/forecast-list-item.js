import titleCaseString from "../functions/title-case-string";

export default function ForecastListItem(props) {
  // parse time
  const dateAndTime = props.forecast.dt_txt;
  
  const date = dateAndTime.split(" ")[0];
  const year = Number(date.split("-")[0]);
  const month = Number(date.split("-")[1]);
  const day = Number(date.split("-")[2]);

  const time = dateAndTime.split(" ")[1];
  const hour = Number(time.split(":")[0]);
  const minute = Number(time.split(":")[1]);
  const second = Number(time.split(":")[2]);

  // create Date
  const utcDate = new Date(Date.UTC(year, month, day, hour, minute, second));

  // get date string
  const dateOptions = { dateStyle: 'medium'}
  const localDate = utcDate.toLocaleDateString('en-US', dateOptions)

  // get time string
  const localTime = utcDate.toLocaleTimeString('en-us')

  const titleDesc = titleCaseString(props.forecast.weather[0].description)

  return (
    <div className="border-2 border-blue-800 m-1 p-2 rounded-md bg-green-200 w-max">
      <div>
        <h6>{localDate}</h6>
        <h6>{localTime}</h6>
        <h6>TEMP: {props.forecast.main.temp}</h6>
        <h6>{titleDesc}</h6>
      </div>
    </div>
  );
}

