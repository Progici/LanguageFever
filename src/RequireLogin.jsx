import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "./AppContext";

function RequireLogin({ children }) {
  const { active } = useContext(AppContext);

  console.log("Active:", active);

  if (!active) {
    console.log("Redirecting to /login");
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RequireLogin;
