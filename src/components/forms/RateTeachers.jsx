import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import HoverRating from "./hoverRating";
import CommentForm from "./CommentForm";
import { useState } from "react";

export default function rateTeacher({ teacher }) {
  const [rating, setRating] = useState(null); // Stanje za pohranu ocjene
  const [comment, setComment] = useState(""); // Stanje za pohranu komentara
  const teacherId = teacher.id;

  // Funkcija za slanje podataka
  const handleSubmit = (e) => {
    e.preventDefault();

    // Provjerite jesu li ocjena i komentar prisutni
    if (rating !== null && comment.trim()) {
      const data = {
        ocjena: rating,
        komentar: comment,
      };

      // Pošaljite POST zahtjev na backend
      fetch(`/mojeocjene/${teacherId}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((result) => {
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
          Ocjenite učitelja
        </Typography>
        <Typography variant="h5" component="div">
          {teacher.ime}
        </Typography>
        <Box>
          <HoverRating rating={rating} setRating={setRating} />
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

// function RateTeachers() {
//   const [selectedCard, setSelectedCard] = React.useState(0);

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         height: "100vh", // Visina celog viewport-a
//         display: "flex",
//         justifyContent: "center", // Horizontalno centriranje
//         alignItems: "center", // Vertikalno centriranje
//         backgroundColor: "background.default",
//         p: 2,
//         overflow: "hidden", // Zabrana skrolovanja na celokupnom ekranu
//       }}
//     >
//       <Box
//         sx={{
//           width: "100%",
//           maxWidth: "800px", // Maksimalna širina sadržaja
//           maxHeight: "80vh", // Maksimalna visina za skrolovanje, 80% visine ekrana
//           overflowY: "auto", // Vertikalno skrolovanje ako ima previše sadržaja
//           display: "grid",
//           gridTemplateColumns:
//             "repeat(auto-fill, minmax(min(200px, 100%), 1fr))", // Fleksibilni grid raspored
//           gap: 2, // Razmak između kartica
//           p: 2,
//           alignContent: "start", // Početno poravnanje sadržaja u gridu
//         }}
//       >
//         {cards.map((card, index) => (
//           <Card key={card.id} sx={{ height: "auto" }}>
//             <CardActionArea
//               onClick={() => setSelectedCard(index)}
//               data-active={selectedCard === index ? "" : undefined}
//               sx={{
//                 height: "100%",
//                 "&[data-active]": {
//                   backgroundColor: "action.selected",
//                   "&:hover": {
//                     backgroundColor: "action.selectedHover",
//                   },
//                 },
//               }}
//             >
//               <CardContent
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   textAlign: "center", // Opcionalno: centriranje teksta
//                   gap: 2, // Razmak između komponenti u kartici
//                   height: "auto", // Kartica se automatski prilagođava visini sadržaja
//                   minHeight: "200px", // Minimalna visina kartice
//                 }}
//               >
//                 <Typography variant="h5" component="div">
//                   {card.teacher}
//                 </Typography>
//                 <Box>
//                   <HoverRating />
//                 </Box>
//                 <Box>
//                   <CommentForm />
//                 </Box>
//               </CardContent>
//             </CardActionArea>
//           </Card>
//         ))}
//       </Box>
//     </Box>
//   );
// }
