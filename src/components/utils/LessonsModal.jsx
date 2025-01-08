import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DatePicker from "../forms/DatePicker";
import SubmitButton from "../forms/SubmitButton";
import "./LessonsModal.css";
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
}) {
  const formatDate = (date) => {
    if (!date) return "No date selected";
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Intl.DateTimeFormat("hr-HR", options).format(new Date(date));
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Odabrali ste {formatDate(selectedDate)}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form>
              <Box sx={{ marginBottom: "20px" }}>
                <DatePicker label={"Datum početka"} name={"start"} />
              </Box>
              <Box sx={{ marginBottom: "20px" }}>
                <DatePicker label={"Datum završetka"} name={"end"} />
              </Box>
              <Box id="button" sx={{ marginBottom: "20px" }}>
                <SubmitButton label={"Spremi"} type={"submit"} />
              </Box>
            </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
