import LessonsModal from "../utils/LessonsModal";
import { useState, useEffect, useContext } from "react";
import "../css/CalendarUser.css";
import { ApiConfig } from "../../config/api.config";
import CalendarComponent from "./CalendarComponent";
import { AppContext } from "../../AppContext";
import dayjs from "dayjs";

function CalendarUser() {
  const { selected } = useContext(AppContext);

  const [lessons, setLessons] = useState([]);
  const [formData, setFormData] = useState({
    start: null,
    end: null,
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [open, setOpen] = useState(false);

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

  function handleChange(name, value) {
    setFormData({
      ...formData,
      [name]: value || dayjs(), // Default to current date if null
    });
  }

  function getEventClassName(status) {
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
  }

  useEffect(() => {
    const fetchLessons = async () => {
      let endpoint = null;
      if (selected === 1) {
        endpoint = "/mojelekcije/ucenik"; // Endpoint for students
        console.warn("Selected value is Student");
      } else if (selected === 2) {
        console.warn("Selected value is Teacher");
        endpoint = "/mojelekcije/ucitelj"; // Endpoint for teachers
      } else {
        console.warn("Selected value is not valid. Skipping fetch.");
        setLessons([]); // Set empty lessons
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

        // Map lessons
        const mappedLessons = data.map((lesson) => ({
          ucenikName: lesson?.ucenik?.korisnik?.name,
          ucenikEmail: lesson?.ucenik?.korisnik?.email,
          id: lesson.id,
          title: "Lekcija",
          start: lesson.timestampPocetka,
          end: lesson.timestampZavrsetka,
          className: getEventClassName(lesson.status),
        }));

        setLessons(mappedLessons);
        console.log("Mapped data:", mappedLessons);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };

    fetchLessons();
  }, [selected]);

  return (
    <>
      {selected === 2 && (
        <LessonsModal
          open={open}
          handleClose={handleClose}
          selectedDate={selectedDate}
          formData={formData}
          handleChange={handleChange}
        />
      )}
      <CalendarComponent onDateClick={handleOpen} lessons={lessons} />
    </>
  );
}

export default CalendarUser;
