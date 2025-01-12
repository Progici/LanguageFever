import LessonsModal from "../utils/LessonsModal";
import { useState, useEffect } from "react";
import "../css/CalendarUser.css";
import { ApiConfig } from "../../config/api.config";
import CalendarComponent from "./CalendarComponent";
import dayjs from "dayjs";

function CalendarDynamicTeacher({ idKorisnika }) {
  const [lessons, setLessons] = useState();

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

  useEffect(() => {
    fetch(ApiConfig.API_URL + `/ucitelji/${idKorisnika}/lekcije`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);

        // Use map instead of forEach to return a new array
        const mappedLessons = data.map((lesson) => ({
          title: "Lekcija",
          start: lesson.timestampPocetka,
          end: lesson.timestampZavrsetka,
          className: getEventClassName(lesson.status),
        }));

        console.log("Mapped lessons for FullCalendar:", mappedLessons);
        setLessons(mappedLessons);
      })
      .catch((error) => console.error("Error fetching lessons:", error));
  }, []);

  const [selectedDate, setSelectedDate] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = (date) => {
    setSelectedDate(date);
    setOpen(true);
    setFormData({
      start: dayjs(date),
      end: dayjs(date),
    });
  };

  return (
    <>
      <CalendarComponent onDateClick={handleOpen} lessons={lessons} />
    </>
  );
}

export default CalendarDynamicTeacher;
