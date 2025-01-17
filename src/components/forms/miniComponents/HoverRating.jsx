import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";

const labels = {
  1: "Vrlo loše",
  2: "Loše",
  3: "U redu",
  4: "Dobro",
  5: "Odlično",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function HoverRating({ rating, setRating, readOnly }) {
  const [value, setValue] = React.useState();
  const [hover, setHover] = React.useState(-1);

  return (
    <Box
      sx={{
        width: 200,
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Rating
        readOnly={readOnly}
        name="hover-feedback"
        value={rating}
        precision={1}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setRating(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box
          sx={{
            ml: 2,
          }}
        >
          {labels[hover !== -1 ? hover : rating]}
        </Box>
      )}
    </Box>
  );
}
