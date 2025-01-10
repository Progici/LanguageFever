import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";

export default function BasicDateTimePicker({ label, value, name, onChange }) {
  const handleDateChange = (newDate) => {
    // Ensure newDate is properly handled as a Dayjs object
    onChange({ target: { name: name, value: newDate } });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="hr">
      <DemoContainer components={["DateTimePicker"]}>
        <DateTimePicker
          value={dayjs(value)} // Convert value to a Dayjs object if it's not already one
          onChange={handleDateChange} // Ensure onChange updates the parent state
          name={name}
          label={label}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
