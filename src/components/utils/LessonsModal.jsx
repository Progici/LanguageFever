import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DatePicker from "../forms/DatePicker";
import SubmitButton from "../forms/SubmitButton";
import "../css/LessonsModal.css";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { ApiConfig } from "../../config/api.config";

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
  onClose,
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

    const StartDate = formData.start.toISOString(); // Get ISO format of start date
    const EndDate = formData.end.toISOString(); // Get ISO format of end date

    console.log("Submitting lesson:", StartDate, EndDate);

    const data = {
      timestampPocetka: StartDate, // Pass ISO string for API
      timestampZavrsetka: EndDate, // Pass ISO string for API
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
        return response.json();
      })
      .then((res) => {
        console.log("Lesson successfully added:", res);
        onClose(); // Close the modal after successful submission
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error adding lesson:", error);
      });
  };

  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Odabrali ste {formatDate(selectedDate)}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="hr">
              <form onSubmit={handleSubmit}>
                <Box sx={{ marginBottom: "20px" }}>
                  <DateTimePicker
                    label={"Datum i vrijeme početka"}
                    value={formData.start}
                    onChange={handleChange}
                    name={"start"}
                  />
                </Box>
                <Box sx={{ marginBottom: "20px" }}>
                  <DateTimePicker
                    label={"Datum i vrijeme završetka"}
                    value={formData.end}
                    onChange={handleChange}
                    name={"end"}
                  />
                </Box>

                <Box id="button" sx={{ marginBottom: "20px" }}>
                  <SubmitButton label={"Spremi"} type={"submit"} />
                </Box>
              </form>
            </LocalizationProvider>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
