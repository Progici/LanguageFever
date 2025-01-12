import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import SubmitButton from "../forms/SubmitButton";
import "../css/LessonsModal.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { ApiConfig } from "../../config/api.config";
import "dayjs/locale/hr";
import dayjs from "dayjs";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function LessonsModal({
  open,
  handleClose,
  selectedDate,
  formData,
  handleChange,
}) {
  // Format date for display in the modal
  const formatDate = (date) => {
    if (!date) return "No date selected";
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Intl.DateTimeFormat("hr-HR", options).format(new Date(date));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      timestampPocetka: formData.start,
      timestampZavrsetka: formData.end,
    };

    // API request to save the lesson
    fetch(ApiConfig.API_URL + "/dodajlekciju", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      })
      .then((res) => {
        console.log("Lesson successfully added:", res);
        handleClose(); // Close the modal after successful submission
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error adding lesson:", error);
      });
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Odabrali ste {formatDate(selectedDate)}
          </Typography>
          {/* Use a div instead of Typography to avoid <p> wrapping */}
          <div id="modal-modal-description" style={{ marginTop: "16px" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="hr">
              <form onSubmit={handleSubmit}>
                <Box sx={{ marginBottom: "20px" }}>
                  <DateTimePicker
                    label={"Datum i vrijeme početka"}
                    value={formData.start ? dayjs(formData.start) : null}
                    onChange={(newValue) => handleChange("start", newValue)}
                    name={"start"}
                  />
                </Box>
                <Box sx={{ marginBottom: "20px" }}>
                  <DateTimePicker
                    label={"Datum i vrijeme završetka"}
                    value={formData.end ? dayjs(formData.end) : null}
                    onChange={(newValue) => handleChange("end", newValue)}
                    name={"end"}
                  />
                </Box>
                <Box id="button" sx={{ marginBottom: "20px" }}>
                  <SubmitButton label={"Spremi"} type={"submit"} />
                </Box>
              </form>
            </LocalizationProvider>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
