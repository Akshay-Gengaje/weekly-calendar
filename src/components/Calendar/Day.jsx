import moment from "moment-timezone";
import { useWeek } from "../../context/WeekContext";
import TimeSlot from "./TimeSlot";
const Day = () => {
  const Days = [];
  const { date } = useWeek();

  //Monday of current week
  const mondayDate = moment(date).startOf("isoWeek");

  for (let day = 0; day < 5; day++) {
    const currentDate = moment(mondayDate).add(day, "days");
    Days.push(currentDate);
  }
  return (
    <div>
      {Days?.map((day) => (
        <div
          key={day.format()}
          className="flex border-b border-gray-300 hover:bg-gray-100"
        >
          <div className="bg-gray-300 flex flex-col justify-center items-center text-center  w-fit p-7">
            <span className="text-red-700 ">{day.format("ddd")}</span>
            <span>{day.format("MM/DD")}</span>
          </div>
          <TimeSlot day={day} />
        </div>
      ))}
    </div>
  );
};

export default Day;
