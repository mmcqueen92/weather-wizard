import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLocationCrosshairs,
    faHatWizard,
  } from "@fortawesome/free-solid-svg-icons";

export default function Home(props) {
const {getLocation, useCustomLocation, userInput, handleUserInput, isLoading } = props;
return (
    <div className="border-4 border-blue-800 rounded-md max-w-md mx-auto bg-blue-300 p-2">
        <div className="relative">
          <h3 className="text-blue-800 font-bold">Welcome to Weather-Wizard</h3>
          <FontAwesomeIcon
            icon={faHatWizard}
            className="text-blue-800 absolute top-5 right-5 fa-3x"
          ></FontAwesomeIcon>
          {isLoading?<div>loading</div>: <div></div>}
        </div>

        <br />
        <label htmlFor="user_loc" className="text-blue-800 font-medium">
          Use current location:
        </label>
        <button
          name="user_loc"
          onClick={getLocation}
          className="border-2 border-blue-800 m-1 p-1 rounded-md h-9 w-9 bg-blue-800 hover:bg-blue-200 hover:text-blue-800 text-blue-200"
        >
          <FontAwesomeIcon icon={faLocationCrosshairs}></FontAwesomeIcon>
        </button>
        <form onSubmit={useCustomLocation}>
          <input
            type="text"
            id="enter_city"
            name="enter_city"
            placeholder="Enter a Location"
            value={userInput}
            onChange={handleUserInput}
            className="border-2 border-blue-800 m-1 p-1 rounded-md"
            required
          ></input>
          <button
            type="submit"
            className="border-2 border-blue-800 m-1 p-1 rounded-md bg-blue-800 hover:bg-blue-200 hover:text-blue-800 text-blue-200 font-medium"
          >
            Search
          </button>
        </form>
      </div>
)
}