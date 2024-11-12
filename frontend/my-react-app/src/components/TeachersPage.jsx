import React, { useState, useEffect } from 'react';
import './TeachersPage.css';
import TeacherCard from './TeacherCard';
import FilterBar from './FilterBar';
import { ApiConfig } from '../config/api.config';

const TeachersPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 12;

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch(ApiConfig.API_URL + "/teachers", { method: 'GET'});
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTeachers(data);  // Spremi podatke u state
        setLoading(false);   // Postavi loading na false kad su podaci učitani
      } catch (error) {
        console.error("Error fetching teachers:", error);
        setLoading(false); 
      }
    };

    fetchTeachers(); // Pozivanje fetch funkcije za učitavanje učitelja
  }, []);  // Prazan niz znači da će se pozvati samo jednom kad se komponenta učita

  // Ako se podaci učitavaju, prikaži indikator učitavanja
  if (loading) {
    return <div>Učitavanje...</div>;
  }

  // Paginacija
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTeachers = teachers.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(teachers.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="teachers-page">
      <FilterBar />
      <div className="teacher-cards">
        {currentTeachers.map(teacher => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))}
      </div>

      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Prethodna
        </button>
        <span>Stranica {currentPage} od {Math.ceil(teachers.length / itemsPerPage)}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(teachers.length / itemsPerPage)}
        >
          Sljedeća
        </button>
      </div>
    </div>
  );
};

export default TeachersPage;
