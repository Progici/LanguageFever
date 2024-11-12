import React, { useState } from "react";
import "./TeacherCard.css";
import { Link } from "react-router-dom";

const TeacherCard = ({ teacher }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="teacher-card">
      <img
        src="https://ip.index.hr/remote/bucket.index.hr/b/index/4b4b6c6f-b74a-43dd-8a97-c8f053c4a0ac.jpg?width=765&height=470"
        alt={teacher.name}
        className={showDetails ? "small-img" : "large-img"}
      />
      <h3>{teacher.name}</h3>
      {!showDetails ? (
        <div className="short-details">
          <p>Jezici: {teacher.email}</p>
          <p>Ocjena: {teacher.email}</p>
        </div>
      ) : (
        <div className="long-details">
          <p>Jezici: {teacher.email}</p>
          <p>Iskustvo: {teacher.email} godina</p>
          <p>Kvalifikacije: {teacher.email}</p>
          <p>Satnica: {teacher.email}</p>
          <p>Stil podučavanja: {teacher.email}</p>
          <p>Ocjena: {teacher.email}</p>
        </div>
      )}
      <div className="card-actions">
        <span
          className="toggle-details"
          onClick={handleToggleDetails}
          id="togl"
        >
          {showDetails ? "Sakrij detalje" : "Prikaži detalje"}
        </span>
        <Link to={`/teachers/${teacher.id}`} className="profile-button">
          Prikaži profil
        </Link>
      </div>
    </div>
  );
};

export default TeacherCard;
