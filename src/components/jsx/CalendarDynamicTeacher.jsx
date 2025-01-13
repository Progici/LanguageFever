import { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import "../css/CalendarUser.css";
import { ApiConfig } from "../../config/api.config";
import CalendarComponent from "./CalendarComponent";
import ReservationModal from "../utils/ReservationModal";
import { AppContext } from "../../AppContext";

function CalendarDynamicTeacher({ idKorisnika, post, setPost }) {
  const [lessons, setLessons] = useState();
  const [formData, setFormData] = useState({
    start: null,
    end: null,
  });
  const [open, setOpen] = useState(false);
  const [lessonId, setLessonId] = useState(null);
  const { selected } = useContext(AppContext);

  const handleEvent = (event) => {
    if (selected === 0) {
      alert(`Odaberi učenika ili učitelja (Uredi profil)`);
      return;
    } else if (selected === 2) {
      alert(`Nisi učenik, ne možeš rezervirati lekcije.`);
      return;
    }

    const { start, end, classNames } = event.event;
    setLessonId(event.event._def.publicId);

    if (classNames[0] === "event-available") {
      setFormData({
        start: start,
        end: end,
      });
      setOpen(true);
    } else {
      const status = classNames[0].split("-")[1]; // Izvlači status iz className
      alert(`Ne može, lekcija je ${status}`);
    }
  };

  function handleNothing() {}

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

  useEffect(() => {
    console.log("id");
    console.log(idKorisnika);
    console.log("lessons");
    console.log(lessons);
  }, [lessons]);

  useEffect(() => {
    fetch(ApiConfig.API_URL + `/ucitelji/${idKorisnika}/lekcije`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        // Use map instead of forEach to return a new array
        const mappedLessons = data.map((lesson) => ({
          title: "Lekcija",
          id: lesson.id,
          start: lesson.timestampPocetka,
          end: lesson.timestampZavrsetka,
          className: getEventClassName(lesson.status),
        }));

        setLessons(mappedLessons);
      })
      .catch((error) => console.error("Error fetching lessons:", error));
  }, [post]);

  return (
    <>
      <ReservationModal
        open={open}
        formData={formData}
        lessonId={lessonId}
        handleClose={handleClose}
        setPost={setPost}
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
