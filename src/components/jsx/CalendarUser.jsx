import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import multiMonthPlugin from "@fullcalendar/multimonth";
import interactionPlugin from "@fullcalendar/interaction";
import LessonsModal from "../utils/LessonsModal";
import momentPlugin from "@fullcalendar/moment";
import hrLocale from "@fullcalendar/core/locales/hr";
import { useState } from "react";
import "../css/CalendarUser.css";

// dayGridDay, dayGridWeek, dayGridMonth, dayGridYear
// timeGridDay, timeGridWeek
// listDay, listWeek, listMonth, listYear
// multiMonthYear

function CalendarUser({ dayClickAction }) {
  const [formData, setFormData] = useState({
    title: "",
    className: "",
    start: "",
    end: "",
  });

  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleOpen = (date) => {
    setSelectedDate(date);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  return (
    <>
      <LessonsModal
        open={open}
        onClose={handleClose}
        selectedDate={selectedDate}
      ></LessonsModal>
      <div className="calendar-container">
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            listPlugin,
            multiMonthPlugin,
            interactionPlugin,
            momentPlugin,
          ]}
          initialView="dayGridMonth"
          locale={hrLocale}
          events={[
            { title: "Probni", start: "2025-01-01" },
            {
              title: "ProbniVrijeme",
              start: "2025-01-03T12:00:00",
              allDay: false,
            },
            { title: "ProbniTrajanje", start: "2025-01-07", end: "2025-01-09" },
          ]}
          headerToolbar={{
            left: "prev next today",
            center: "title",
            right: "dayGridMonth timeGridDay listDay",
          }}
          firstDay={1}
          dateClick={(info) => handleOpen(info.dateStr)}
        />
      </div>
    </>
  );
}

export default CalendarUser;
