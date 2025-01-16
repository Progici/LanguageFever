import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import HoverRating from "./miniComponents/HoverRating";
import CommentForm from "./miniComponents/CommentForm";
import { useState, useEffect, useContext } from "react";
import { ApiConfig } from "../../config/api.config";
import { AppContext } from "../../AppContext";
import { toast } from "react-toastify";

export default function rateTeacher({ teacher, id, setPost }) {
  const [rating, setRating] = useState(null); // Stanje za pohranu ocjene
  const [comment, setComment] = useState("");
  const { active } = useContext(AppContext); // Stanje za pohranu komentara

  useEffect(() => {
    console.log("id");
    console.log(id);
    console.log("teacher");
    console.log(teacher);
    console.log("rating");
    console.log(rating);
    console.log("comment");
    console.log(comment);
  }, [teacher, comment, rating]);

  // Funkcija za slanje podataka
  const handleSubmit = (e) => {
    if (!active) {
      toast.error("Molimo Vas da se prvo prijavite.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
      });
      return;
    }
    e.preventDefault();

    // Provjerite jesu li ocjena i komentar prisutni
    if (rating !== null && comment.trim()) {
      const data = {
        ocjena: rating,
        komentar: comment,
      };

      // Pošaljite POST zahtjev na backend
      fetch(ApiConfig.API_URL + `/ucitelji/${id}/ocjene`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((result) => {
          toast.success("Ocjena uspješno dodana!", {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
          });
          setPost((post) => !post);
          console.log("Ocjena uspješno dodana:", result);
        })
        .catch((error) => {
          toast.error("Greška pri slanju ocjene.", {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
          });
          console.error("Greška pri slanju ocjene:", error);
        });
    } else {
      toast.error("Molimo vas da unesete ocjenu i komentar.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
      });
    }
  };

  return (
    <Card
      sx={{
        width: "80%",
        height: "auto", // Visina celog viewport-a
        display: "flex",
        justifyContent: "center", // Horizontalno centriranje
        alignItems: "center", // Vertikalno centriranje
        backgroundColor: "background.default",
        p: 2,
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center", // Opcionalno: centriranje teksta
          gap: 2, // Razmak između komponenti u kartici
          height: "auto", // Kartica se automatski prilagođava visini sadržaja
          minHeight: "200px", // Minimalna visina kartice
        }}
      >
        <Typography
          gutterBottom
          sx={{ textAlign: "center", color: "text.secondary", fontSize: 14 }}
        >
          Ocijenite učitelja
        </Typography>
        <Typography variant="h5" component="div">
          {teacher.name}
        </Typography>
        <Box>
          <HoverRating rating={rating} setRating={setRating} readOnly={false} />
        </Box>
        <Box>
          <CommentForm comment={comment} setComment={setComment} />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" onClick={handleSubmit}
          sx={{backgroundColor: "rgba(61, 76, 243, 0.582)", color: "antiquewhite"}}>
            Pošaljite ocjenu
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
