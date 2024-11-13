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
        src={teacher.korisnik.picture}
        alt={teacher.korisnik.name}
        className={showDetails ? "small-img" : "large-img"}
      />
      <h3>{teacher.korisnik.name}</h3>
      {!showDetails ? (
        <div className="short-details">
          <p>Jezici: {teacher.jezici.join(', ')}</p>
          <p>Ocjena: 0</p>
        </div>
      ) : (
        <div className="long-details">
          <p>Jezici: {teacher.jezici.join(', ')}</p>
          <p>Iskustvo: {teacher.godineIskustva} godina</p>
          <p>Kvalifikacije: {teacher.kvalifikacija}</p>
          <p>Satnica: {teacher.satnica} eura</p>
          <p>Stil podučavanja: {teacher.stilPoducavanja}</p>
          <p>Ocjena: 0</p>
        </div>
      )}
      <div className="card-actions">
        <span
          className="toggle-details"
          onClick={handleToggleDetails}
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
