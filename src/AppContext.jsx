import React, { createContext, useState, useEffect } from "react";

// Create the context
export const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  // Initialize state from localStorage if available, else use default values
  const [active, setActive] = useState(() => {
    const savedActive = localStorage.getItem("active");
    return savedActive ? JSON.parse(savedActive) : false;
  });

  const [selected, setSelected] = useState(() => {
    const savedSelected = localStorage.getItem("selected");
    return savedSelected ? JSON.parse(savedSelected) : 1; // Default to 1
  });

  const [currentTeacher, setCurrentTeacher] = useState(() => {
    const savedTeacher = localStorage.getItem("currentTeacher");
    return savedTeacher ? JSON.parse(savedTeacher) : null;
  });

  const [currentStudent, setCurrentStudent] = useState(() => {
    const savedStudent = localStorage.getItem("currentStudent");
    return savedStudent ? JSON.parse(savedStudent) : null;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Use useEffect to save state to localStorage whenever the state changes
  useEffect(() => {
    if (active !== null) {
      localStorage.setItem("active", JSON.stringify(active));
    }
  }, [active]);

  useEffect(() => {
    if (selected !== null) {
      localStorage.setItem("selected", JSON.stringify(selected));
    }
  }, [selected]);

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
