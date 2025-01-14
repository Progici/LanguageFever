import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import HoverRating from "./miniComponents/HoverRating";
import CommentForm from "./miniComponents/CommentForm";
import { useState, useEffect, useContext } from "react";
import { ApiConfig } from "../../config/api.config";
import { AppContext } from "../../AppContext";

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
      alert("Please login first.");
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
          setPost((post) => !post);
          console.log("Ocjena uspješno dodana:", result);
        })
        .catch((error) => {
          console.error("Greška pri slanju ocjene:", error);
        });
    } else {
      alert("Molimo vas da unesete ocjenu i komentar.");
    }
  };

  return (
    <Card
      sx={{
        width: "100%",
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
          <Button variant="contained" onClick={handleSubmit}>
            Pošaljite ocjenu
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
