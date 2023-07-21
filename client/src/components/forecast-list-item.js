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

  // get time string + remove leading 0s
  const localTime = utcDate.toLocaleTimeString('en-us', { hour: "2-digit", minute: "2-digit" })
  const localTimeSplit = localTime.split(":")
  localTimeSplit[0] = parseInt(localTimeSplit[0])
  const localTimeParsed = localTimeSplit.join(":")

  const titleDesc = titleCaseString(props.forecast.weather[0].description)

  return (
    <div className="flex flex-col border-2 border-blue-800 m-1 p-2 rounded-md bg-blue-200 w-36 shrink-0">
      <div>
        <h6>{localDate}</h6>
        <h6>{localTimeParsed}</h6>
        <h6>{props.forecast.main.temp}&#8451;</h6>
        <h6>{titleDesc}</h6>
      </div>
    </div>
  );
}

