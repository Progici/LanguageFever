import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { ApiConfig } from "../../../config/api.config";
import { useEffect, useContext } from "react";
import { AppContext } from "../../../AppContext";
import { toast } from "react-toastify";

export default function LessonAccDen({ lessonId, setPost }) {
  const { setChange } = useContext(AppContext);

  const handleRequest = async (action) => {
    let message = "";
    let endpoint = "";
    if (action === "accept") {
      endpoint = `/prihvatirezervacijulekcije/${lessonId}`;
      message = "Zahtjev je uspješno prihvaćen!";
    } else if (action === "reject") {
      endpoint = `/otkazirezervacijulekcije/${lessonId}`;
      message = "Zahtjev je uspješno odbijen!";
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
      setChange((change) => !change);
      setPost((post) => !post);

      toast.success(message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
      });
    } catch (error) {
      toast.error("Došlo je do pogreške.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
      });
      console.error(`Error during ${action}ing the lesson:`, error);
    }
  };

  useEffect(() => {
    console.log("lessonId");
    console.log(lessonId);
  }, [lessonId]);

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
