import React, { useState, useEffect } from "react";
import "../css/TeacherProfile.css";
import TeacherCard from "./TeacherCard";
import { ApiConfig } from "../../config/api.config";
import { Box } from "@mui/material";
import CalendarUser from "./CalendarUser";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import CalendarDynamicTeacher from "./CalendarDynamicTeacher";
import RateTeachers from "../forms/RateTeachers";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress

const TeacherProfile = () => {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null); // Use null initially for better data handling

  // useEffect(() => {
  //   console.log("teacher");
  //   console.log(teacher);
  // }, [teacher]);

  // Fetch teacher data when the component mounts or when the `id` changes
  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        // Send request to fetch teacher details based on the id
        const response = await fetch(ApiConfig.API_URL + `/ucitelji/${id}`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        setTeacher(data); // Update state with fetched teacher data
      } catch (error) {
        console.error("Error fetching teacher data:", error);
      }
    };

    // Only fetch teacher data when the `id` changes
    if (id) {
      fetchTeacher();
    }
  }, [id]); // Dependency on `id` to refetch data when the URL changes

  if (!teacher) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress /> {/* Display loading circle */}
      </div>
    ); // Show loading circle while teacher data is being fetched
  }

  return (
    <>
      <div className="flex-container">
        <React.Fragment>
          <CssBaseline />
          <Container
            maxWidth="md"
            sx={{
              backgroundColor: "#f5f5f5",
              padding: 4,
              borderRadius: 2,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              height: "auto",
            }}
          >
            <Box id="item" sx={{ height: "auto" }}>
              <Box key={teacher.id} className="teacher-box">
                <div className="teacher-info">
                  <img src={teacher.picture} alt={teacher.name} />
                  <div className="teacher-details">
                    <p>Ime: {teacher.name}</p>
                    <p>Jezici: {teacher.jezici?.join(", ")}</p>
                    <p>Iskustvo: {teacher.godineIskustva} godina</p>
                    <p>Kvalifikacije: {teacher.kvalifikacija}</p>
                    <p>Satnica: {teacher.satnica} eura</p>
                    <p>Stil podučavanja: {teacher.stilPoducavanja}</p>
                    {/* Placeholder for dynamic rating */}
                    <p>Ocjena: 0</p>
                  </div>
                </div>
              </Box>
            </Box>
          </Container>
        </React.Fragment>

        <Container
          maxWidth="md"
          sx={{
            backgroundColor: "#f5f5f5",
            padding: 4,
            borderRadius: 2,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            height: "auto",
          }}
        >
          <div id="item" className="teacher-calendar">
            <h2 style={{ textAlign: "center" }}>
              Kalendar dostupnosti lekcija
            </h2>
            <CalendarDynamicTeacher id={id} />
          </div>
        </Container>

        <Container
          maxWidth="md"
          sx={{
            backgroundColor: "#f5f5f5",
            padding: 4,
            borderRadius: 2,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            height: "auto",
          }}
        >
          <RateTeachers teacher={teacher} id={id} />
        </Container>
      </div>
    </>
  );
};

export default TeacherProfile;
