import * as React from "react";

import TextField from "@mui/material/TextField";

export default function newLessonForm({ label, value, name, onChange }) {
  return (
    <>
      <TextField
        id="outlined-basic"
        label={label}
        value={value}
        onChange={onChange}
        name={name}
        variant="outlined"
        fullWidth
      />
    </>
  );
}
