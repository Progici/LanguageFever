import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "./AppContext";

function RequireSelection({ children }) {
  const { selected } = useContext(AppContext);

  console.log("Selected:", selected);

  if (selected === 0) {
    console.log("Redirecting to /edit-user");
    return <Navigate to="/edit-user" replace />;
  }

  return children;
}

export default RequireSelection;
