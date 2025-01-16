import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { ApiConfig } from "../../config/api.config";
import { Typography } from "@mui/material";
import { useEffect } from "react";

dayjs.extend(utc);
dayjs.extend(timezone);

const columns = [
  { field: "id", headerName: "Broj", width: 90 },
  {
    field: "tName",
    headerName: "Ime učenika",
    width: 150,
  },
  {
    field: "timestampStart",
    headerName: "Početak",
    width: 250,
  },
  {
    field: "timestampEnd",
    headerName: "Kraj",
    width: 250,
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
  },
];

export default function DataGridDemo() {
  const [rows, setRows] = useState(null);
  const [post, setPost] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          ApiConfig.API_URL + "/mojelekcije/ucitelj",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();

          // Pretvaramo podatke u odgovarajući format za DataGrid
          const transformedData = data
            .filter((item) => item.status === "FINISHED")
            .map((item, index) => ({
              id: index + 1,
              tName: item.uciteljName,
              timestampStart: dayjs(item.timestampPocetka)
                .tz("Europe/Paris") // Convert to GMT+1 (Paris time zone)
                .format("dddd, DD.MM.YYYY HH:mm"), // Adjust format if needed
              timestampEnd: dayjs(item.timestampZavrsetka)
                .tz("Europe/Paris")
                .format("dddd, DD.MM.YYYY HH:mm"),
              status: item.status,
              lessonId: item.id,
              setPost: setPost, // Pass setPost function here
            }));

          setRows(transformedData); // Set transformed data to rows
        } else {
          console.error("Error fetching data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(); // Pokrećemo dohvat podataka
  }, [post]);

  return (
    <Box
      sx={{
        height: "100vh", // Make the height full viewport height
        display: "flex",
        flexDirection: "column", // Stack the title and grid vertically
        justifyContent: "center", // Vertically center the content
        alignItems: "center", // Horizontally center the content
        margin: "auto", // Centers horizontally
        backgroundColor: "white", // Optional: Add background color for better visibility
      }}
    >
      {/* Title centered above the grid */}
      <Typography
        variant="h6"
        sx={{ marginBottom: 2, color: "rgba(61, 76, 243, 0.582)" }}
      >
        Arhiva lekcija učitelja
      </Typography>

      <Box
        sx={{
          height: "70%",
          width: "70%", // Set the width to 70% of the screen
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // backgroundColor: "rgba(61, 76, 243, 0.582)", // Add background color for the grid area
          borderRadius: 2, // Optional: Add rounded corners to the grid box
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Optional: Add box shadow to the grid box
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
        />
      </Box>
    </Box>
  );
}
