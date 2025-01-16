import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import multiMonthPlugin from "@fullcalendar/multimonth";
import interactionPlugin from "@fullcalendar/interaction";
import momentPlugin from "@fullcalendar/moment";
import hrLocale from "@fullcalendar/core/locales/hr";
import "../css/CalendarUser.css";

function CalendarComponent({ lessons, onDateClick, onEventClick }) {
  return (
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
        events={lessons}
        locale={hrLocale}
        headerToolbar={{
          left: "prev next today",
          center: "title",
          right: "dayGridMonth timeGridDay listDay",
        }}
        firstDay={1}
        dateClick={(info) => onDateClick(info.dateStr)}
        eventClick={(info) => onEventClick(info)}
      />
    </div>
  );
}

export default CalendarComponent;
