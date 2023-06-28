import { useState } from "react";
import {
  getUserLocation,
  getCustomLocation,
} from "../functions/location-functions";

export default function Container(props) {
  const [active, setActive] = useState(false);
  const [location, setLocation] = useState();

  const useUserLocation = () => {
    setLocation(getUserLocation());
    if (location) {
      setActive(true);
    }
  };

  const useCustomLocation = (location) => {
    setLocation(getCustomLocation(location));
    if (location) {
        setActive(true);
      }
  };

  if (active) {
    return (
      <div>
        <h4>This is ACTIVE!</h4>
        <div>
          <h5>Current Weather</h5>
          <h6>Weather Icon</h6>
          <h6>Weather Info</h6>
        </div>
        <div>
          <h5>Hours/Days</h5>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h4>This is INACTIVE!</h4>
        <button onClick={useUserLocation}>User location</button>
        <div>
          <label for="enter_city">Enter a location</label>
          <input type="text" id="enter_city" name="enter_city"></input>
          <button onClick={useCustomLocation}>Custom location</button>
        </div>
      </div>
    );
  }
}
