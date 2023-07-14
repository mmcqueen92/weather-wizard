export default function ForecastListItem (props) {
    // parse time
    const dateAndTime = props.forecast.dt_txt
    
    // 2023-07-15
    const date = dateAndTime.split(" ")[0]
    const year = Number(date.split("-")[0])
    const month = Number(date.split("-")[1])
    const day = Number(date.split("-")[2])

    //  03:00:00
    const time = dateAndTime.split(" ")[1]
    const hour = Number(time.split(":")[0])
    const minute = Number(time.split(":")[1])
    const second = Number(time.split(":")[2])

    const utcDate = new Date(Date.UTC(year, month, day, hour, minute, second))
    const localDate = utcDate.toLocaleString("en-US", {
        dateStyle: "full",
        timeStyle: "full"
    })


    return (
        <div>
            <h5>Forecast list item:</h5>
            <div>
                {props.forecast.dt_txt}<br/>
                {props.timezone}<br/><br/>
                <h5>LOCAL DATE/TIME: {localDate}</h5>
                {props.forecast.main.temp}<br/>
                {props.forecast.weather[0].description}<br/>
                
            </div>
        </div>
    )
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