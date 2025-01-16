import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import "../css/LessonsModal.css";
import { ApiConfig } from "../../config/api.config";
import { useContext } from "react";
import { AppContext } from "../../AppContext";
import dayjs from "dayjs";
import "dayjs/locale/hr";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

export default function ReservationModal({
  open,
  handleClose,
  formData,
  lessonId,
  setPost,
}) {
  const { active } = useContext(AppContext);

  // Handle form submission
  const handleConfirm = () => {
    if (!active) {
      toast.error("Molimo Vas da se prvo prijavite.", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
      });
      return;
    }

    fetch(ApiConfig.API_URL + `/rezervirajlekciju/${lessonId}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setPost((post) => !post);
        toast.success("Lekcija je uspješno rezervirana!", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
        });
        console.log("Lesson successfully added");
        handleClose();
      })
      .catch((error) => {
        toast.error("Lekcija se nije uspjela rezervirati.", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
        });
        console.error("Error adding lesson:", error);
      });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Želiš li rezervirati ovu lekciju?
        </Typography>

        <>
          <Typography
            id="modal-modal-description"
            style={{ marginTop: "16px", marginBottom: "16px" }}
          >
            Odabrali ste {formData.start ? formatDate(formData.start) : ""} -{" "}
            {formData.end ? formatDate(formData.end) : ""}
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", gap: "16px" }}>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Odustani
            </Button>

            <Button variant="contained" color="primary" onClick={handleConfirm}>
              Prihvati
            </Button>
          </Box>
        </>
      </Box>
    </Modal>
  );
}

// Helper function for date formatting
const formatDate = (date) => {
  return dayjs(date).locale("hr").format("dddd, DD.MM.YYYY HH:mm");
};
