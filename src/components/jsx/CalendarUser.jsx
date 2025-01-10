import LessonsModal from "../utils/LessonsModal";
import { useState, useEffect } from "react";
import "../css/CalendarUser.css";
import AxiosInstance from "../axios/AxiosInstance";
import { ApiConfig } from "../../config/api.config";
import CalendarComponent from "./CalendarComponent";
import dayjs from "dayjs";

function CalendarUser() {
  const [lessons, setLessons] = useState();
  const [formData, setFormData] = useState({
    start: "",
    end: "",
  });

  // const handleChange = (name, value) => {
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };
  /*hardkodiranje - izbrisati kasnije*/
  // useEffect(() => {
  //   const hardcodedLessons = [
  //     {
  //       id: 1,
  //       timestampPocetka: "2025-01-01 12:00:00",
  //       timestampZavrsetka: "2025-01-01 13:00:00",
  //       status: "AVAILABLE",
  //     },
  //     {
  //       id: 2,
  //       timestampPocetka: "2025-01-02 13:00:00",
  //       timestampZavrsetka: "2025-01-03 15:00:00",
  //       status: "PENDING",
  //     },
  //     {
  //       id: 3,
  //       timestampPocetka: "2025-01-04",
  //       timestampZavrsetka: "2025-01-05",
  //       status: "DENIED",
  //     },
  //     {
  //       id: 4,
  //       timestampPocetka: "2025-01-06 10:00:00",
  //       timestampZavrsetka: "2025-01-06 10:00:00",
  //       status: "ACCEPTED",
  //     },
  //     {
  //       id: 5,
  //       timestampPocetka: "2025-01-07 10:00:00",
  //       timestampZavrsetka: "2025-01-07 11:00:00",
  //       status: "FINISHED",
  //     },
  //   ];

  // Mapiranje podataka u format koji FullCalendar očekuje
  //   const mappedLessons = hardcodedLessons.map((lesson) => ({
  //     title: `Lekcija ${lesson.id}`,
  //     start: lesson.timestampPocetka.replace(" ", "T"), // formatiranje u ISO 8601
  //     end: lesson.timestampZavrsetka.replace(" ", "T"), // formatiranje u ISO 8601
  //     className: getEventClassName(lesson.status),
  //   }));

  //   console.log("Mapped lessons for FullCalendar:", mappedLessons);
  //   setLessons(mappedLessons);
  // }, []);

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
    fetch(ApiConfig.API_URL + "/mojelekcije/ucitelj", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);

        // Use map instead of forEach to return a new array
        const mappedLessons = data.map((lesson) => ({
          title: `Lekcija ${lesson.id}`,
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
  const handleClose = () => {
    setOpen(false);
    setFormData({
      start: "",
      end: "",
    });
  };

  return (
    <>
      <LessonsModal
        open={open}
        onClose={handleClose}
        selectedDate={selectedDate}
        formData={formData}
      ></LessonsModal>
      <CalendarComponent onDateClick={handleOpen} lessons={lessons} />
    </>
  );
}

export default CalendarUser;

/*
  const handleAddLesson = (lessonData) => {
    const newLesson = {
      timestampPocetka: lessonData.timestampPocetka,
      timestampZavrsetka: lessonData.timestampZavrsetka,
      status: "AVAILABLE",
    };

    fetch(ApiConfig.API_URL + "/dodajlekciju", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(newLesson),
    })
      .then((response) => response.json())
      .then((data) => {
        // Dodajte novu lekciju u stanje
        setLessons((prevLessons) => [
          ...prevLessons,
          {
            id: data.id,
            title: `Lekcija ${data.id}`,
            start: data.timestampPocetka,
            end: data.timestampZavrsetka,
            status: data.status,
          },
        ]);
        setOpen(false); // Zatvori modal
      })
      .catch((error) => console.error("Error adding lesson:", error));
  };
  */
