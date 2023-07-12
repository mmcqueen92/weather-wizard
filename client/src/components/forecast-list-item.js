export default function ForecastListItem (props) {
    return (
        <div>
            <h5>Forecast list item:</h5>
            <div>
                {props.forecast.dt_txt}<br/>
                {props.timezone}<br/>
                {props.forecast.main.temp}<br/>
                {props.forecast.weather.description}<br/>
                
            </div>
        </div>
    )
}