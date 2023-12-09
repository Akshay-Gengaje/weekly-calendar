import { useState } from "react";
import { WeekProvider } from "./context/WeekContext";
import CalendarLayout from "./layout/CalendarLayout";
import { FaCalendarAlt } from "react-icons/fa";
const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative w-screen ">
      <div className="absolute top-0 right-5">
        <button
          className="border border-slate-500 p-1 rounded-md bg-slate-400 flex gap-2 items-center uppercase shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "Close" : "Show"} Calendar <FaCalendarAlt />
        </button>
      </div>
      <div className={`${isOpen ? "p-2 pt-10 md:p-10" : "hidden"}`}>
        <WeekProvider>
          <CalendarLayout />
        </WeekProvider>
      </div>
    </div>
  );
};

export default App;
