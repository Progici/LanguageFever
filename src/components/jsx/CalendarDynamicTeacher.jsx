import { useState, useEffect, useContext, act } from "react";
import { Navigate } from "react-router-dom";
import "../css/CalendarUser.css";
import { ApiConfig } from "../../config/api.config";
import CalendarComponent from "./CalendarComponent";
import ReservationModal from "../utils/ReservationModal";
import { AppContext } from "../../AppContext";
import { toast } from "react-toastify";

function CalendarDynamicTeacher({ idKorisnika, post, setPost }) {
  const [lessons, setLessons] = useState();
  const [formData, setFormData] = useState({
    start: null,
    end: null,
  });
  const [open, setOpen] = useState(false);
  const [lessonId, setLessonId] = useState(null);
  const { selected, active } = useContext(AppContext);

  const handleEvent = (event) => {
    if (active === false) {
      toast.error("Molimo Vas da se prvo prijavite.", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
      });
      return;
    }
    if (selected === 0 || selected === 2) {
      toast.error("Nisi učenik.", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
      });
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
      const status = classNames[0].split("-")[1];
      toast.error(
        "Lekcija nije dostupna za rezervaciju (odaberi plavu lekciju).",
        {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
        }
      ); // Izvlači status iz className
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
