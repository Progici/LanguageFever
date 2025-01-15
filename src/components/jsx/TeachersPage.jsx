import React, { useState, useEffect } from "react";
import "../css/TeachersPage.css";
import TeacherCard from "./TeacherCard";
import FilterBar from "./FilterBar";
import { ApiConfig } from "../../config/api.config";
import CircularProgress from "@mui/material/CircularProgress";
import { useSearchParams } from "react-router-dom";

const TeachersPage = () => {
  const [teachers, setTeachers] = useState([]); // Učitelji za trenutnu stranicu
  const [totalPages, setTotalPages] = useState(1); // Ukupan broj stranica
  const [searchParams, setSearchParams] = useSearchParams(); // Parametri za pretragu

  // Dohvat trenutne stranice iz query stringa ili postavljanje na 0
  const currentPage = parseInt(searchParams.get("page") || "0", 10);

  useEffect(() => {
    const queryString = new URLSearchParams({
      ...Object.fromEntries(searchParams), // Dodavanje filtera iz URL-a
    }).toString();

    const fetchProfesori = async () => {
      try {
        const response = await fetch(
          `${ApiConfig.API_URL}/ucitelji/filter?${queryString}`,
          { method: "GET" }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setTeachers(data.content); // Postavljamo učitelje za trenutnu stranicu
        setTotalPages(data.totalPages); // Postavljamo ukupan broj stranica
      } catch (error) {
        console.error("Error fetching teacher info:", error);
      }
    };

    fetchProfesori();
  }, [searchParams]);

  if (!teachers) {
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

  // Navigacija na sljedeću stranicu
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setSearchParams({
        ...Object.fromEntries(searchParams),
        page: currentPage + 1,
      });
    }
  };

  // Navigacija na prethodnu stranicu
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setSearchParams({
        ...Object.fromEntries(searchParams),
        page: currentPage - 1,
      });
    }
  };

  return (
    <div className="teachers-page">
      <FilterBar />
      <div className="teacher-cards">
        {teachers.map((teacher) => (
          <TeacherCard key={teacher.idKorisnika} teacher={teacher} />
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 0}>
          Prethodna
        </button>
        <span>
          Stranica {currentPage + 1} od {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
        >
          Sljedeća
        </button>
      </div>
    </div>
  );
};

export default TeachersPage;
