import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "./AppContext";
import { toast } from "react-toastify";

function RequireSelection({ children }) {
  const { selected } = useContext(AppContext);

  console.log("Selected:", selected);

  if (selected === 0) {
    toast.error("Molimo odaberite postojećeg učenika ili učitelja.", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
    });
    console.log("Redirecting to /edit-user");
    return <Navigate to="/edit-user" replace />;
  }

  return children;
}

export default RequireSelection;
