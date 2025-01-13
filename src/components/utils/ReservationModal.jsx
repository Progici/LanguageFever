import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import "../css/LessonsModal.css";
import { ApiConfig } from "../../config/api.config";
import "dayjs/locale/hr";

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
  selectedDate,
  lessonId,
}) {
  // Handle form submission
  const handleConfirm = () => {
    const data = {
      timestampPocetka: selectedDate.start,
      timestampZavrsetka: selectedDate.end,
    };

    fetch(ApiConfig.API_URL + `/rezervirajlekciju/${lessonId}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("Lesson successfully added");
        handleClose(); // Close modal after successful submission
      })
      .catch((error) => {
        console.error("Error adding lesson:", error);
      });
  };
  if (!selectedDate) {
    return null;
  }

  const isAvailable = selectedDate.className === "event-available";

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {isAvailable
            ? "Želiš li rezervirati ovu lekciju?"
            : `Ne možeš rezervirati, lekcija je ${
                selectedDate.className.split("-")[1]
              }`}
        </Typography>

        {isAvailable && (
          <>
            <Typography
              id="modal-modal-description"
              style={{ marginTop: "16px", marginBottom: "16px" }}
            >
              Odabrali ste{" "}
              {selectedDate.start ? formatDate(selectedDate.start) : ""}
            </Typography>
            <Box
              sx={{ display: "flex", justifyContent: "center", gap: "16px" }}
            >
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleClose}
              >
                Odustani
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleConfirm}
              >
                Prihvati
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
}

// Helper function for date formatting
const formatDate = (date) => {
  return dayjs(date).locale("hr").format("dddd, DD.MM.YYYY HH:mm");
};
