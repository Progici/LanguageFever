import LessonsModal from "../utils/LessonsModal";
import { useState, useEffect, useContext } from "react";
import "../css/CalendarUser.css";
import { ApiConfig } from "../../config/api.config";
import CalendarComponent from "./CalendarComponent";
import { AppContext } from "../../AppContext";
import dayjs from "dayjs";

function CalendarUser() {
  const { selected } = useContext(AppContext);
  const [lessons, setLessons] = useState();
  const [formData, setFormData] = useState({
    start: "",
    end: "",
  });

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
    const fetchLessons = async () => {
      let endpoint = null;
      if (selected === 1) {
        endpoint = "/mojelekcije/ucenik"; // Endpoint za učenike
      } else if (selected === 2) {
        endpoint = "/mojelekcije/ucitelj"; // Endpoint za učitelje
      } else {
        console.warn("Selected value is not valid. Skipping fetch.");
        setLessons([]); // Postavljamo prazne lekcije
        return;
      }
      try {
        const response = await fetch(ApiConfig.API_URL + endpoint, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch lessons");
        }

        const data = await response.json();
        console.log("Fetched data:", data);

        const mappedLessons = data.map((lesson) => ({
          title: "Lekcija",
          start: lesson.timestampPocetka,
          end: lesson.timestampZavrsetka,
          className: getEventClassName(lesson.status),
        }));

        setLessons(mappedLessons);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };
    fetchLessons();
  }, [selected]);

  // useEffect(() => {
  //   fetch(ApiConfig.API_URL + "/mojelekcije/ucitelj", {
  //     method: "GET",
  //     credentials: "include",
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Fetched data:", data);

  //       // Use map instead of forEach to return a new array
  //       const mappedLessons = data.map((lesson) => ({
  //         title: `Lekcija ${lesson.id}`,
  //         start: lesson.timestampPocetka,
  //         end: lesson.timestampZavrsetka,
  //         className: getEventClassName(lesson.status),
  //       }));

  //       console.log("Mapped lessons for FullCalendar:", mappedLessons);
  //       setLessons(mappedLessons);
  //     })
  //     .catch((error) => console.error("Error fetching lessons:", error));
  // }, []);

  const [selectedDate, setSelectedDate] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = (date) => {
    if (selected === 2) {
      //samo za učitelje je modal
      setSelectedDate(date);
      setOpen(true);
      setFormData({
        start: dayjs(date),
        end: dayjs(date),
      });
    }
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
  };
}
export default CalendarUser;
