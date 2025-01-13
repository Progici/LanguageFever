import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import CommentForm from "./CommentForm";
import HoverRating from "./hoverRating";

function AllRatings({ idUcitelja }) {
  const [ratings, setRatings] = useState([]);
  useEffect(() => {
    // Fetch ratings data
    const fetchRatings = async () => {
      try {
        const response = await fetch(
          ApiConfig.API_URL + `/mojeocjene/${idUcitelja}`,
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
  }, [idUcitelja]); // Refetch data when idUcitelja changes

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
              <Typography variant="body2" color="text.secondary">
                <HoverRating value={rating.ocjena} readOnly />{" "}
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
