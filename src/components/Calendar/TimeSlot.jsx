import moment from "moment-timezone";
import { useWeek } from "../../context/WeekContext";
import events from "./../../data/eventData.json";
const TimeSlot = ({ day }) => {
  const { selectedTimezone } = useWeek();
  const timeSlots = [];
  const oneDayData = getDataByDate(day);
  //Start Of The Day and End Of The Day is set with UTC-0 Time
  const startOfDay = moment(day)
    .tz("Europe/London")
    .set({ hour: 8, minute: 0, second: 0, millisecond: 0 });
  const endOfDay = moment(day)
    .tz("Europe/London")
    .set({ hour: 23, minute: 0, second: 0, millisecond: 0 });

  // time converted as per selected time zone
  let currentTime = startOfDay.clone().tz(selectedTimezone);
  while (currentTime.isSameOrBefore(moment(endOfDay).tz(selectedTimezone))) {
    const label = currentTime.format("hh:mm A");
    // check event present in the json file
    const isChecked = checkEvent(oneDayData, currentTime);

    timeSlots.push({
      currentTime: currentTime.format(),
      label,
      isChecked,
    });
    currentTime.add(30, "minutes");
  }

  return (
    <div className="flex flex-wrap justify-start items-center  gap-2 w-full p-2">
      {timeSlots.map((timeSlot) => (
        <div key={timeSlot.currentTime} className="flex gap-x-1 items-center">
          <input
            id={timeSlot.currentTime}
            type="checkbox"
            defaultChecked={timeSlot.isChecked}
            // onChange={() => console.log(timeSlot.currentTime)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          ></input>
          <label htmlFor={currentTime}>{timeSlot.label}</label>
        </div>
      ))}
    </div>
  );
};

export default TimeSlot;

const getDataByDate = (day) => {
  const data = events.filter((event) => {
    const eventDate = moment(event.timestamp).tz("Europe/London");
    return eventDate.isSame(moment(day).tz("Europe/London"), "days");
  });
  return data;
};
function checkEvent(events, currentTime) {
  for (const event of events) {
    const timestamp = moment(event.timestamp).tz("Europe/London").format();
    const currentTimestamp = moment(currentTime).tz("Europe/London").format();

    if (timestamp === currentTimestamp) {
      console.log(timestamp, currentTimestamp);
      return true;
    }
  }
  return false;
}
