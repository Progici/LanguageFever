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

const TeacherProfile = () => {
  const [teacher, setTeacher] = useState([]); // Početno stanje: prazna lista učitelja
  const [idKorisnika, setIdKorisnika] = useState(null);

  // Funkcija za dohvat trenutnog korisnika
  const fetchCurrentUser = async () => {
    try {
      const response = await fetch(ApiConfig.API_URL + "/trenutnikorisnik", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch current user");
      }

      const data = await response.json();
      console.log("Fetched current user:", data);

      setIdKorisnika(data.id); // Postavljanje ID korisnika u stanje
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  // Dohvat trenutnog korisnika kada se komponenta učita
  useEffect(() => {
    fetchCurrentUser();
  }, []); // Samo jednom kada komponenta prvi put učita

  // useEffect - dohvat podataka prilikom učitavanja komponente
  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        // Pokretanje fetch zahtjeva za dohvat podataka sa servera
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
        setTeacher(data); // Spremamo učitelja u stanje
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };
    fetchTeacher(); // Pozivanje funkcije za dohvat podataka
  }, []);

  console.log(teacher);

  return (
    <>
      <div className="flex-container">
        <React.Fragment>
          <CssBaseline />
          <Container
            maxWidth="md"
            sx={{
              backgroundColor: "#f5f5f5", // Opcionalno, dodajte pozadinsku boju
              padding: 4, // Unutrašnji razmak (padding)
              borderRadius: 2, // Zaobljeni rubovi
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Blagi efekt sjene
              height: "auto", // Visina će se prilagoditi sadržaju
            }}
          >
            <Box id="item" sx={{ height: "auto" }}>
              {teacher.map((t) => (
                <Box key={t.id} className="teacher-box">
                  <div className="teacher-info">
                    <img src={t.picture} alt={t.name} />
                    <div className="teacher-details">
                      <p>Ime: {t.ime}</p>
                      <p>Jezici: {t.jezici.join(", ")}</p>
                      <p>Iskustvo: {t.godineIskustva} godina</p>
                      <p>Kvalifikacije: {t.kvalifikacija}</p>
                      <p>Satnica: {t.satnica} eura</p>
                      <p>Stil podučavanja: {t.stilPoducavanja}</p>
                      {/* dinamicka ocjena! */}
                      <p>Ocjena: 0</p>
                    </div>
                  </div>
                </Box>
              ))}
            </Box>
          </Container>
        </React.Fragment>

        <Container
          maxWidth="md"
          sx={{
            backgroundColor: "#f5f5f5", // Opcionalno, dodajte pozadinsku boju
            padding: 4, // Unutrašnji razmak (padding)
            borderRadius: 2, // Zaobljeni rubovi
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Blagi efekt sjene
            height: "auto", // Visina će se prilagoditi sadržaju
          }}
        >
          <div id="item" className="teacher-calendar">
            <h2 style={{ textAlign: "center" }}>
              Kalendar dostupnosti lekcija
            </h2>
            <CalendarDynamicTeacher idKorisnika={idKorisnika} />
          </div>
        </Container>
        {/* treba se dinamicki mijenjat ovisno o tome je li poducavan od njega */}
        <Container
          maxWidth="md"
          sx={{
            backgroundColor: "#f5f5f5", // Opcionalno, dodajte pozadinsku boju
            padding: 4, // Unutrašnji razmak (padding)
            borderRadius: 2, // Zaobljeni rubovi
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Blagi efekt sjene
            height: "auto", // Visina će se prilagoditi sadržaju
          }}
        >
          <RateTeachers teacher={teacher}></RateTeachers>
        </Container>
      </div>
    </>
  );
};

export default TeacherProfile;
