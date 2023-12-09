import moment from "moment/moment";
import { useWeek } from "../context/WeekContext";

const Header = () => {
  // State for managing the date
  const { date, handlePreviousWeek, handleNextWeek, handleTimezoneChange } =
    useWeek();
  return (
    <div className="w-full bg-gray-200">
      {/* Header Section */}
      <div className="flex justify-between p-1 sm:p-2 ">
        <button onClick={handlePreviousWeek} className="text-blue-700">
          &lt; Previous Week
        </button>
        <p>{moment(date).format("MMM, DD YYYY")}</p>
        <button onClick={handleNextWeek} className="text-blue-700">
          Next Week &gt;
        </button>
      </div>

      {/* Timezone Selector Section */}
      <div className="w-full">
        <label htmlFor="timezone" className="mt-1 ml-2">
          Timezone
        </label>
        <select
          id="timezone"
          className="h-10 p-1 rounded-md w-[98%] m-2 bg-white shadow-md"
          onChange={(e) => handleTimezoneChange(e)}
        >
          <option value="Europe/London">(UTC+0) London</option>
          <option value="Europe/Sofia">(UTC+2) Sofia</option>
        </select>
      </div>
    </div>
  );
};

export default Header;
