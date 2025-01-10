import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import HoverRating from "./hoverRating";
import CommentForm from "./CommentForm";

const cards = [
  {
    id: 1,
    teacher: "Plants",
    description: "Plants are essential for all life.",
  },
  {
    id: 2,
    teacher: "Animals",
    description: "Animals are a part of nature.",
  },
  {
    id: 3,
    teacher: "Humans",
    description: "Humans depend on plants and animals for survival.",
  },
  {
    id: 4,
    teacher: "Humans",
    description: "Humans depend on plants and animals for survival.",
  },
  {
    id: 5,
    teacher: "Humans",
    description: "Humans depend on plants and animals for survival.",
  },
  {
    id: 5,
    teacher: "Humans",
    description: "Humans depend on plants and animals for survival.",
  },
  {
    id: 5,
    teacher: "Humans",
    description: "Humans depend on plants and animals for survival.",
  },
  {
    id: 5,
    teacher: "Humans",
    description: "Humans depend on plants and animals for survival.",
  },
  {
    id: 5,
    teacher: "Humans",
    description: "Humans depend on plants and animals for survival.",
  },
  {
    id: 5,
    teacher: "Humans",
    description: "Humans depend on plants and animals for survival.",
  },
  {
    id: 5,
    teacher: "Humans",
    description: "Humans depend on plants and animals for survival.",
  },
  {
    id: 5,
    teacher: "Humans",
    description: "Humans depend on plants and animals for survival.",
  },
  {
    id: 5,
    teacher: "Humans",
    description: "Humans depend on plants and animals for survival.",
  },
  {
    id: 5,
    teacher: "Humans",
    description: "Humans depend on plants and animals for survival.",
  },
];

function RateTeachers() {
  const [selectedCard, setSelectedCard] = React.useState(0);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh", // Visina celog viewport-a
        display: "flex",
        justifyContent: "center", // Horizontalno centriranje
        alignItems: "center", // Vertikalno centriranje
        backgroundColor: "background.default",
        p: 2,
        overflow: "hidden", // Zabrana skrolovanja na celokupnom ekranu
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "800px", // Maksimalna širina sadržaja
          maxHeight: "80vh", // Maksimalna visina za skrolovanje, 80% visine ekrana
          overflowY: "auto", // Vertikalno skrolovanje ako ima previše sadržaja
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(min(200px, 100%), 1fr))", // Fleksibilni grid raspored
          gap: 2, // Razmak između kartica
          p: 2,
          alignContent: "start", // Početno poravnanje sadržaja u gridu
        }}
      >
        {cards.map((card, index) => (
          <Card key={card.id} sx={{ height: "auto" }}>
            <CardActionArea
              onClick={() => setSelectedCard(index)}
              data-active={selectedCard === index ? "" : undefined}
              sx={{
                height: "100%",
                "&[data-active]": {
                  backgroundColor: "action.selected",
                  "&:hover": {
                    backgroundColor: "action.selectedHover",
                  },
                },
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
                <Typography variant="h5" component="div">
                  {card.teacher}
                </Typography>
                <Box>
                  <HoverRating />
                </Box>
                <Box>
                  <CommentForm />
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default RateTeachers;
