import React, { createContext, useState, useEffect } from "react";

// Create the context
export const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState(() => {
    // Retrieve the `selected` value from local storage, or default to 0
    const savedSelected = localStorage.getItem("selected");
    return savedSelected ? JSON.parse(savedSelected) : 0;
  });
  const [currentTeacher, setCurrentTeacher] = useState("");
  const [currentStudent, setCurrentStudent] = useState("");
  const [currentUser, setCurrentUser] = useState("");

  // Save the `selected` value to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("selected", JSON.stringify(selected));
  }, [selected]);

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
