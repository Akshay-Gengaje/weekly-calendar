import moment from "moment-timezone";
import { createContext, useContext, useState } from "react";
const WeekContext = createContext();

const WeekProvider = ({ children }) => {
  const [date, setDate] = useState(moment(new Date()).tz("Europe/London"));
  const [selectedTimezone, setSelectedTimezone] = useState("Europe/London");
  const handlePreviousWeek = () => {
    const newDate = moment(date)
      .tz(selectedTimezone)
      .subtract(7, "days")
      .toDate();
    setDate(newDate);
  };
  // Function to handle going to the next week
  const handleNextWeek = () => {
    const newDate = moment(date).tz(selectedTimezone).add(7, "days").toDate();
    setDate(newDate);
  };

  //Function to handle timezone
  const handleTimezoneChange = (event) => {
    const newTimezone = event.target.value;
    setSelectedTimezone(newTimezone);
  };
  return (
    <WeekContext.Provider
      value={{
        date,
        handleNextWeek,
        handlePreviousWeek,
        selectedTimezone,
        handleTimezoneChange,
      }}
    >
      {children}
    </WeekContext.Provider>
  );
};

const useWeek = () => {
  const context = useContext(WeekContext);
  if (context === undefined) {
    throw new Error("You are accessing WeekContext outside the provider");
  }
  return context;
};

export { WeekProvider, useWeek };
