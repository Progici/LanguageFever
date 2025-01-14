import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { ApiConfig } from "../../../config/api.config";
import { useEffect } from "react";

export default function AdminDel({ idKorisnika, setPost, role }) {
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

  const handleUser = async () => {
    try {
      const response = await fetch(
        ApiConfig.API_URL + `/setuser/${idKorisnika}`,
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

  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="contained"
        color={role === "ROLE_ADMIN" ? "success" : "primary"} // Change color based on role
        onClick={role === "ROLE_USER" ? handleAdmin : handleUser} // Handle role toggle
      >
        {role === "ROLE_ADMIN" ? "Postavi Usera" : "Postavi Admina"}{" "}
        {/* Change button text based on role */}
      </Button>
      <Button variant="outlined" color="error" onClick={() => handleDelete()}>
        Briši
      </Button>
    </Stack>
  );
}
