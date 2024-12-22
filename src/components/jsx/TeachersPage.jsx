import React, { useState, useEffect } from "react";
import "../css/TeachersPage.css";
import TeacherCard from "./TeacherCard";
import FilterBar from "./FilterBar";
import { ApiConfig } from "../../config/api.config";

const TeachersPage = () => {
  // Definicija stanja za učitelje i trenutnu stranicu
  const [teachers, setTeachers] = useState([]); // Početno stanje: prazna lista učitelja
  const [currentPage, setCurrentPage] = useState(1); // Početno stanje: prva stranica

  const itemsPerPage = 12; // Definiramo broj učitelja po stranici

  // useEffect - dohvat podataka prilikom učitavanja komponente
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        // Pokretanje fetch zahtjeva za dohvat podataka sa servera
        const response = await fetch(ApiConfig.API_URL + "/ucitelji", {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTeachers(data); // Spremamo učitelje u stanje
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers(); // Pozivanje funkcije za dohvat podataka
  }, []); // Prazan niz znači da će efekt biti pozvan samo jednom, prilikom mountanja komponente

  const indexOfLastItem = currentPage * itemsPerPage; // Indeks posljednjeg učitelja na stranici
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; // Indeks prvog učitelja na stranici
  const currentTeachers = teachers.slice(indexOfFirstItem, indexOfLastItem); // Uzima se podskup učitelja za trenutnu stranicu

  // Funkcija za premještanje na sljedeću stranicu
  const handleNextPage = () => {
    if (currentPage < Math.ceil(teachers.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1); // Povećavamo trenutnu stranicu
    }
  };

  // Funkcija za premještanje na prethodnu stranicu
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1); // Smanjujemo trenutnu stranicu
    }
  };

  return (
    <div className="teachers-page">
      {" "}
      {/* Glavni kontejner za stranicu učitelja */}
      <FilterBar /> {/* Komponenta za filtriranje učitelja */}
      <div className="teacher-cards">
        {currentTeachers.map((teacher) => (
          <TeacherCard key={teacher.id} teacher={teacher} /> // Prikazujemo svaki učitelj kao komponentu
        ))}
      </div>
      <div className="pagination">
        {" "}
        {/* Sekcija za stranice */}
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Prethodna {/* Gumb za prethodnu stranicu */}
        </button>
        <span>
          Stranica {currentPage} od {Math.ceil(teachers.length / itemsPerPage)}{" "}
          {/* Tekst koji prikazuje trenutnu stranicu */}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(teachers.length / itemsPerPage)}
        >
          Sljedeća {/* Gumb za sljedeću stranicu */}
        </button>
      </div>
    </div>
  );
};

export default TeachersPage;
