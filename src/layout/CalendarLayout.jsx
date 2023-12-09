import Calendar from "../components/Calendar/Calendar";
import Header from "../components/Header";

const CalendarLayout = () => {
  return (
    <div className="w-full border border-black rounded-md overflow-hidden shadow-md">
      <Header />
      <Calendar />
    </div>
  );
};

export default CalendarLayout;
