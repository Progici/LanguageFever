import { useState, useEffect } from "react";
import "../css/CalendarUser.css";
import { ApiConfig } from "../../config/api.config";
import CalendarComponent from "./CalendarComponent";

function CalendarDynamicTeacher({ id }) {
  const [lessons, setLessons] = useState();

  function handleOpen() {}

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
      <CalendarComponent onDateClick={handleOpen} lessons={lessons} />
    </>
  );
}

export default CalendarDynamicTeacher;
