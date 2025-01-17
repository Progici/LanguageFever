import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function CommentForm({ comment, setComment }) {
  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="standard-multiline-flexible"
          label="Komentar"
          multiline
          maxRows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          variant="standard"
        />
      </div>
    </Box>
  );
}
