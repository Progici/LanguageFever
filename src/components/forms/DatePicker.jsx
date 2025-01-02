import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/hr";
export default function datePicker({ label, value, name, onChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="hr">
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          sx={{ width: "100%" }}
          inputFormat="DD/MM/YYYY"
          value={value}
          onChange={onChange}
          name={name}
          label={label}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
