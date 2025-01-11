import React, { createContext, useState, useEffect } from "react";

// Create the context
export const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState(0);

  const [currentTeacher, setCurrentTeacher] = useState(() => {
    const savedTeacher = localStorage.getItem("currentTeacher");
    return savedTeacher ? JSON.parse(savedTeacher) : "";
  });

  const [currentStudent, setCurrentStudent] = useState(() => {
    const savedStudent = localStorage.getItem("currentStudent");
    return savedStudent ? JSON.parse(savedStudent) : "";
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : "";
  });

  useEffect(() => {
    if (currentTeacher !== null) {
      localStorage.setItem("currentTeacher", JSON.stringify(currentTeacher));
    }
  }, [currentTeacher]);

  useEffect(() => {
    if (currentStudent !== null) {
      localStorage.setItem("currentStudent", JSON.stringify(currentStudent));
    }
  }, [currentStudent]);

  // Corrected this useEffect: it should reference currentUser, not currentStudent
  useEffect(() => {
    if (currentUser !== null) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
  }, [currentUser]); // Now watches for changes in `currentUser`

  return (
    <AppContext.Provider
      value={{
        active,
        setActive,
        selected,
        setSelected,
        currentTeacher,
        setCurrentTeacher,
        currentStudent,
        setCurrentStudent,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
