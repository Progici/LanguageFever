import React, { useState, useEffect } from "react";
import "./TeachersPage.css";
import TeacherCard from "./TeacherCard";
import FilterBar from "./FilterBar";
import { ApiConfig } from "../config/api.config";

const TeachersPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 12;

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch(ApiConfig.API_URL + "/ucitelji", {
          method: "GET"
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTeachers(data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };
    fetchTeachers();
  }, []);
  
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
        {currentTeachers.map((teacher) => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))}
      </div>

      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Prethodna
        </button>
        <span>
          Stranica {currentPage} od {Math.ceil(teachers.length / itemsPerPage)}
        </span>
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
