import React, { useState } from "react";
import "../css/TeacherCard.css";
import { Link } from "react-router-dom";
import teacherPhoto from "../../assets/images/teacherdefault.png";

const TeacherCard = ({ teacher }) => {
  // Definiramo stanje za upravljanje prikazom detalja učitelja
  const [showDetails, setShowDetails] = useState(false); // Početno stanje je false (detalji nisu prikazani)

  // Funkcija za prebacivanje između prikaza detalja učitelja
  const handleToggleDetails = () => {
    setShowDetails(!showDetails); // Prebacuje stanje sa true na false i obrnuto
  };

  return (
    <div className="teacher-card">
      <img
        src={teacher.picture ? teacher.picture : teacherPhoto} // Use teacher.picture if available, otherwise fallback to teacherPhoto
        alt={teacher.picture ? teacher.name : ""} // Only set alt if teacher.picture exists
        className={showDetails ? "small-img" : "large-img"} // If details are shown, small image; otherwise, large image
      />
      <h3>{teacher.name}</h3> {/* Ime učitelja */}
      {/* Prikazujemo kratke ili duže detalje o učitelju na temelju stanja */}
      {!showDetails ? (
        <div className="short-details">
          {/* improvizirano */}
          <p>Jezici: {teacher.jezici.join(", ")}</p>{" "}
          {/* Prikazujemo jezike učitelja */}
          <p>Ocjena: {parseFloat(teacher.rating).toFixed(2)}</p>{" "}
          {/* Ovdje bi trebala biti ocjena učitelja, trenutno statički postavljeno na 0 */}
        </div>
      ) : (
        <div className="long-details">
          {/* improvizirano */}
          <p>Jezici: {teacher.jezici.join(", ")}</p>{" "}
          {/* Prikazujemo jezike učitelja */}
          <p>Iskustvo: {teacher.godineIskustva} godina</p>{" "}
          {/* Prikazujemo godine iskustva učitelja */}
          <p>Kvalifikacije: {teacher.kvalifikacija.replace(/_/g, " ")}</p>{" "}
          {/* Prikazujemo kvalifikacije učitelja */}
          <p>Satnica: {teacher.satnica} eura</p>{" "}
          {/* Prikazujemo satnicu učitelja */}
          <p>
            Stil podučavanja: {teacher.stilPoducavanja.replace(/_/g, " ")}
          </p>{" "}
          {/* Prikazujemo stil podučavanja učitelja */}
          <p>Ocjena: {parseFloat(teacher.rating).toFixed(1)}</p>{" "}
          {/* Ovdje bi također trebala biti ocjena učitelja */}
        </div>
      )}
      <div className="card-actions">
        <span
          className="toggle-details"
          onClick={handleToggleDetails} // Poziva funkciju koja mijenja stanje prikaza detalja
        >
          {showDetails ? "Sakrij detalje" : "Prikaži detalje"}{" "}
          {/* Tekst ovisno o stanju */}
        </span>

        {/* Link koji vodi na stranicu s detaljima učitelja */}
        <Link
          to={`/teachers/${teacher.idKorisnika}`}
          className="profile-button"
        >
          Prikaži profil
        </Link>
      </div>
    </div>
  );
};

export default TeacherCard;
