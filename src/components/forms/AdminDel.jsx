import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { ApiConfig } from "../../config/api.config";
import { useEffect } from "react";

export default function LessonAccDen({ idKorisnika, setPost }) {
  const handleAdmin = async () => {
    try {
      const response = await fetch(
        ApiConfig.API_URL + `/setadmin/${idKorisnika}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error`);
      }

      setPost((post) => !post);
    } catch (error) {
      console.error(`Error`, error);
      alert("Došlo je do pogreške.");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        ApiConfig.API_URL + `/korisnici/${idKorisnika}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error`);
      }

      setPost((post) => !post);
    } catch (error) {
      console.error(`Error`, error);
      alert("Došlo je do pogreške.");
    }
  };

  return (
    <Stack direction="row" spacing={2}>
      <Button variant="contained" color="success" onClick={() => handleAdmin()}>
        Admin
      </Button>
      <Button variant="outlined" color="error" onClick={() => handleDelete()}>
        Briši
      </Button>
    </Stack>
  );
}
