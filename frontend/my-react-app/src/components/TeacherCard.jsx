import teacherPhoto from '../assets/images/gotovo.jpeg';
import React, { useState } from 'react';
import './TeacherCard.css';
import { Link } from 'react-router-dom';

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
        className={showDetails ? 'small-img' : 'large-img'} 
      />
      <h3>{teacher.name}</h3>
      {!showDetails ? (
        <div className="short-details">
          <p>Jezici: {teacher.languages.join(', ')}</p>
          <p>Ocjena: {teacher.rating}</p>
        </div>
      ) : (
        <div className="long-details">
          <p>Jezici: {teacher.languages.join(', ')}</p>
          <p>Iskustvo: {teacher.experience} godina</p>
          <p>Kvalifikacije: {teacher.qualifications}</p>
          <p>Satnica: {teacher.hourlyRate}</p>
          <p>Stil podučavanja: {teacher.teachingStyle}</p>
          <p>Ocjena: {teacher.rating}</p>
        </div>
      )}
      <div className="card-actions">
        <span 
          className="toggle-details" 
          onClick={handleToggleDetails}
          id='togl'
        >
          {showDetails ? 'Sakrij detalje' : 'Prikaži detalje'}
        </span>
        <Link to={`/teachers/${teacher.id}`} className="profile-button">
          Prikaži profil
        </Link>
      </div>
    </div>
  );
};

export default TeacherCard;
