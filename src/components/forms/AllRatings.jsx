import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import CommentForm from "./CommentForm";
import HoverRating from "./hoverRating";
import { useState, useEffect } from "react";
import { ApiConfig } from "../../config/api.config";

function AllRatings({ idKorisnika, post }) {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    console.log("ratings");
    console.log(ratings);
  }, [ratings]);

  useEffect(() => {
    // Fetch ratings data
    const fetchRatings = async () => {
      try {
        const response = await fetch(
          ApiConfig.API_URL + `/ucitelji/${idKorisnika}/ocjene`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch ratings");
        }

        const data = await response.json();
        setRatings(data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching ratings:", error);
      }
    };

    fetchRatings();
  }, [post]); // Refetch data when idUcitelja changes

  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(200px, 100%), 1fr))",
        gap: 2,
      }}
    >
      {ratings.map((rating, index) => (
        <Card key={index}>
          <CardActionArea sx={{ height: "100%" }}>
            <CardContent sx={{ height: "100%" }}>
              {/* Student Name */}
              <Typography variant="h5" component="div">
                {rating.ucenikName}
              </Typography>

              {/* Rating */}
              <Typography
                variant="body2"
                color="text.secondary"
                component="div"
              >
                <HoverRating rating={rating.ocjena} readOnly={true} />{" "}
                {/* Prikaz ocjene */}
              </Typography>

              {/* Comment */}
              <Typography variant="body2" color="text.secondary">
                {rating.komentar}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}

export default AllRatings;
