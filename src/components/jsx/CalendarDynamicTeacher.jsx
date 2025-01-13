import { useState, useEffect } from "react";
import "../css/CalendarUser.css";
import { ApiConfig } from "../../config/api.config";
import CalendarComponent from "./CalendarComponent";

function CalendarDynamicTeacher({ id }) {
  const [lessons, setLessons] = useState();
  const [formData, setFormData] = useState({
    start: null,
    end: null,
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [open, setOpen] = useState(false);

  const handleEvent = (event) => {
    const { start, end, className } = event; // 'event' sadrži className
    if (className === "event-available") {
      setSelectedDate({ start, end, className });
      setOpen(true);
    } else {
      const status = className.split("-")[1]; // Izvlači status iz className
      alert(`Ne može, lekcija je ${status}`);
    }
  };

  function handleNothing() {}

  function handleOpen(date) {
    setSelectedDate(date);
    setOpen(true);
    setFormData({
      start: dayjs(date),
      end: dayjs(date),
    });
  }

  function handleClose() {
    setOpen(false);
    setFormData({
      start: null,
      end: null,
    });
  }

  const getEventClassName = (status) => {
    switch (status) {
      case "AVAILABLE":
        return "event-available";
      case "PENDING":
        return "event-pending";
      case "DENIED":
        return "event-denied";
      case "ACCEPTED":
        return "event-accepted";
      case "FINISHED":
        return "event-finished";
      default:
        return "";
    }
  };

  // useEffect(() => {
  //   console.log("id");
  //   console.log(id);
  //   console.log("lessons");
  //   console.log(lessons);
  // }, [lessons]);

  useEffect(() => {
    fetch(ApiConfig.API_URL + `/ucitelji/${id}/lekcije`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        // Use map instead of forEach to return a new array
        const mappedLessons = data.map((lesson) => ({
          title: "Lekcija",
          start: lesson.timestampPocetka,
          end: lesson.timestampZavrsetka,
          className: getEventClassName(lesson.status),
        }));

        setLessons(mappedLessons);
      })
      .catch((error) => console.error("Error fetching lessons:", error));
  }, []);

  return (
    <>
      <ReservationModal
        open={open}
        selectedDate={selectedDate}
        handleClose={handleClose}
        lessonId={id}
      />
      <CalendarComponent
        onEventClick={handleEvent}
        onDateClick={handleNothing}
        lessons={lessons}
      />
    </>
  );
}

export default CalendarDynamicTeacher;
