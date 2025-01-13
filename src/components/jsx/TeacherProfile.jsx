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
import AllRatings from "../forms/AllRatings";

const TeacherProfile = () => {
  const { idKorisnika } = useParams();
  const [teacher, setTeacher] = useState(null); // Use null initially for better data handling
  const [post, setPost] = useState(false);
  const [doneLesson, setDoneLesson] = useState(false);

  useEffect(() => {
    console.log("idKorisnika");
    console.log(idKorisnika);
    console.log("teacher");
    console.log(teacher);
    console.log("doneLesson");
    console.log(doneLesson);
  }, [teacher, doneLesson]);

  // Fetch teacher data when the component mounts or when the `id` changes
  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        // Send request to fetch teacher details based on the id
        const response = await fetch(
          ApiConfig.API_URL + `/ucitelji/${idKorisnika}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        setTeacher(data); // Update state with fetched teacher data
      } catch (error) {
        console.error("Error fetching teacher data:", error);
      }
    };

    fetchTeacher();
  }, [post]); // Dependency on `id` to refetch data when the URL changes

  useEffect(() => {
    const fetchDoneLesson = async () => {
      try {
        // Send request to fetch teacher details based on the id
        const response = await fetch(
          ApiConfig.API_URL + `/odradenalekcija/${idKorisnika}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        setDoneLesson(data);
      } catch (error) {
        console.error("Error fetching lesson data:", error);
      }
    };

    fetchDoneLesson();
  }, [post]);

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
            <Box
              id="item"
              sx={{
                height: "auto",
              }}
            >
              <Box key={teacher.idKorisnika} className="teacher-box">
                <div className="teacher-info">
                  <img src={teacher.picture} alt={teacher.name} />
                  <div className="teacher-details">
                    <p>Ime: {teacher.name}</p>
                    <p>Jezici: {teacher.jezici?.join(", ")}</p>
                    <p>Iskustvo: {teacher.godineIskustva} godina</p>
                    <p>
                      Kvalifikacije: {teacher.kvalifikacija.replace(/_/g, " ")}
                    </p>
                    <p>Satnica: {teacher.satnica} eura</p>
                    <p>
                      Stil podučavanja:{" "}
                      {teacher.stilPoducavanja.replace(/_/g, " ")}
                    </p>
                    {/* Placeholder for dynamic rating */}
                    <p>Ocjena: {teacher.rating}</p>
                    <p>
                      Broj podučavanih učenika: {teacher.poducavaniUceniciBroj}
                    </p>
                    <p>Broj dovršenih lekcija: {teacher.dovrseneLekcijeBroj}</p>
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
            <CalendarDynamicTeacher
              idKorisnika={idKorisnika}
              post={post}
              setPost={setPost}
            />
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
          <h2 style={{ textAlign: "center" }}>Prikaz ocjena</h2>
          <AllRatings idKorisnika={idKorisnika} post={post}></AllRatings>
        </Container>
        {doneLesson && (
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
            <RateTeachers
              teacher={teacher}
              id={idKorisnika}
              setPost={setPost}
            />
          </Container>
        )}
      </div>
    </>
  );
};

export default TeacherProfile;
