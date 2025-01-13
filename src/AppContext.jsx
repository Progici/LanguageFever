import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [active, setActive] = useState(false);

  const [selected, setSelected] = useState(() => {
    const savedSelected = localStorage.getItem("selected");
    return savedSelected ? JSON.parse(savedSelected) : 0;
  });

  useEffect(() => {
    localStorage.setItem("selected", JSON.stringify(selected));
  }, [selected]);

  const [currentTeacher, setCurrentTeacher] = useState(null);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

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
