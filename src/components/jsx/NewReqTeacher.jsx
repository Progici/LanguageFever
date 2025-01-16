import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import RequestTeacher from "../forms/RequestTeacher";

export default function NewReqTeacher() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            backgroundColor: "#f5f5f5", // Opcionalno, dodajte pozadinsku boju ako želite
            padding: 4, // Unutrašnji razmak (padding)
            borderRadius: 2, // Zaobljeni rubovi
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Blagi efekt sjene
          }}
        >
          <RequestTeacher />
        </Container>
      </Box>
    </React.Fragment>
  );
}
