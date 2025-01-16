import React, { useState, useEffect, useContext } from "react";
import "../css/TeacherProfile.css";
import { ApiConfig } from "../../config/api.config";
import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import CalendarDynamicTeacher from "./CalendarDynamicTeacher";
import RateTeachers from "../forms/RateTeachers";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress
import AllRatings from "../forms/AllRatings";
import FreeChat from "./FreeChat";
import { AppContext } from "../../AppContext";

const TeacherProfile = () => {
  const { active } = useContext(AppContext);
  const { idKorisnika } = useParams(); // idKorisnika means user ID in Croatian
  const [teacher, setTeacher] = useState(null); // Use null initially for better data handling
  const [post, setPost] = useState(false);
  const [doneLesson, setDoneLesson] = useState(false);
  const [hasAcceptedLesson, setHasAcceptedLesson] = useState(false);
  const [teacherEmail, setTeacherEmail] = useState(false);

  useEffect(() => {
    console.log("idKorisnika"); // idKorisnika means user ID in Croatian
    console.log(idKorisnika);
    console.log("teacher");
    console.log(teacher);
    console.log("doneLesson");
    console.log(doneLesson);
    console.log("hasAcceptedLesson");
    console.log(hasAcceptedLesson);
    console.log("teacherEmail");
    console.log(teacherEmail);
  }, [teacher, doneLesson, teacherEmail, hasAcceptedLesson]);

  // Fetch teacher data when the component mounts or when the `id` changes
  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        // Send request to fetch teacher details based on the id
        const response = await fetch(
          ApiConfig.API_URL + `/ucitelji/${idKorisnika}`, // ucitelji means teachers in Croatian
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
    if (active) {
      const fetchDoneLesson = async () => {
        try {
          // Send request to fetch teacher details based on the id
          const response = await fetch(
            ApiConfig.API_URL + `/odradenalekcija/${idKorisnika}`, // odradenalekcija means completed lesson in Croatian
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
    }
  }, [post]);

  useEffect(() => {
    if (active) {
      const fetchDoneLesson = async () => {
        try {
          // Send request to fetch teacher details based on the id
          const response = await fetch(
            ApiConfig.API_URL + `/dogovorenalekcija/${idKorisnika}`, // dogovorenalekcija means scheduled lesson in Croatian
            {
              method: "GET",
              credentials: "include",
            }
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();

          setHasAcceptedLesson(data);
        } catch (error) {
          console.error("Error fetching lesson data:", error);
        }
      };

      fetchDoneLesson();
    }
  }, [post]);

  useEffect(() => {
    if (active && hasAcceptedLesson) {
      const fetchEmail = async () => {
        try {
          // Send request to fetch teacher details based on the id
          const response = await fetch(
            ApiConfig.API_URL + `/ucitelji/${idKorisnika}/email`,
            {
              method: "GET",
              credentials: "include",
            }
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.text();
          console.log("data");
          console.log(data);
          setTeacherEmail(data);
        } catch (error) {
          console.error("Error fetching email data:", error);
        }
      };

      fetchEmail();
    }
  }, [post, hasAcceptedLesson]);

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
            className = "teacher-container"
            
          >
            <Box
              id="item"
              sx={{
                height: "auto",
              }}
            >
              <Box key={teacher.idKorisnika} className="teacher-box">
                {" "}
                <div className="teacher-info">
                  <img src={teacher.picture} alt={teacher.name} />
                  <div className="teacher-details">
                    <p>Ime: {teacher.name}</p>
                    <p>Jezici: {teacher.jezici?.join(", ")}</p>
                    <p>Iskustvo: {teacher.godineIskustva} godina</p>
                    <p>
                      Kvalifikacije: {teacher.kvalifikacija.replace(/_/g, " ")}{" "}
                    </p>
                    <p>Satnica: {teacher.satnica} eura</p>
                    <p>
                      Stil podučavanja:
                      {teacher.stilPoducavanja.replace(/_/g, " ")}
                    </p>
                    {/* Placeholder for dynamic rating */}
                    <p>Ocjena: {parseFloat(teacher.rating).toFixed(2)}</p>
                    <p>
                      Broj podučavanih učenika: {teacher.poducavaniUceniciBroj}{" "}
                    </p>
                    <p>Broj dovršenih lekcija: {teacher.dovrseneLekcijeBroj}</p>{" "}
                  </div>
                </div>
              </Box>
            </Box>
          </Container>
        </React.Fragment>

        <Container
          maxWidth="md"
          className="teacher.calendar"
          
        >
          <div id="item" className="teacher-calendar">
            <h2 style={{ textAlign: "center", paddingTop: "20px" }}>
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
            padding: 4,
            borderRadius: 2,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            height: "auto",
            marginTop: "30px",
            backgroundColor: "rgba(61, 76, 243, 0.582)",
            color:"antiquewhite"
          }}
        >
          <h2 style={{ textAlign: "center" }}>Prikaz ocjena</h2>
          <AllRatings idKorisnika={idKorisnika} post={post}></AllRatings>
        </Container>
        {hasAcceptedLesson && teacherEmail && (
          <FreeChat
            mail={teacherEmail}
            picture={teacher.picture}
            name={teacher.name}
          />
        )}
        {doneLesson && (
          <Container
            maxWidth="md"
            className = "rate-container"
            
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
