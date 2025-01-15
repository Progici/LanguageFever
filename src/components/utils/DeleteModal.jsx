import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import "../css/LessonsModal.css";
import { ApiConfig } from "../../config/api.config";
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

export default function DeleteModal({
  open,
  handleClose,
  formData,
  lessonId,
  setPost,
}) {
  // Handle form submission
  const handleConfirm = (e) => {
    e.preventDefault();

    fetch(ApiConfig.API_URL + `/izbrisimojulekciju/${lessonId}`, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setPost((post) => !post);
        toast.success("Lekcija je uspješno izbrisana!", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
        });
        console.log("Lesson successfully deleted");
        handleClose(); // Close modal after successful submission
      })
      .catch((error) => {
        toast.success("Lekcija se nije uspjela izbrisati.", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
        });
        console.error("Error deleting lesson:", error);
      });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Želiš li izbrisati ovu lekciju?
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
