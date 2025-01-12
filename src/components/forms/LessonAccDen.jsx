import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { ApiConfig } from "../../config/api.config";

export default function LessonAccDen({ lessonId }) {
  const handleRequest = async (action) => {
    let endpoint = "";
    if (action === "accept") {
      endpoint = `/prihvatirezervacijulekcije/${lessonId}`;
    } else if (action === "reject") {
      endpoint = `/otkazirezervacijulekcije/${lessonId}`;
    }

    try {
      const response = await fetch(ApiConfig.API_URL + `${endpoint}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error during ${action}ing the lesson`);
      }
      alert(`Lekcija ${action === "accept" ? "prihvaćena" : "odbijena"}!`);
    } catch (error) {
      console.error(`Error during ${action}ing the lesson:`, error);
      alert("Došlo je do pogreške.");
    }
  };

  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="contained"
        color="success"
        onClick={() => handleRequest("accept")}
      >
        Prihvati
      </Button>
      <Button
        variant="outlined"
        color="error"
        onClick={() => handleRequest("reject")}
      >
        Odbij
      </Button>
    </Stack>
  );
}
