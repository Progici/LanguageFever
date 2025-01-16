import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import LessonAccDen from "./miniComponents/LessonAccDen.jsx";
import { ApiConfig } from "../../config/api.config";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Typography } from "@mui/material";

dayjs.extend(utc);
dayjs.extend(timezone);

const columns = [
  { field: "id", headerName: "Broj", width: 90, editable: false },
  {
    field: "name",
    headerName: "Ime učenika",
    width: 150,
    editable: false,
  },
  {
    field: "timestampPocetka",
    headerName: "Početak",
    width: 250,
    sortable: false,
    editable: false,
  },
  {
    field: "timestampZavrsetka",
    headerName: "Završetak",
    width: 250,
    sortable: false,
    editable: false,
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
  },
  {
    field: "pick",
    headerName: "Zahtjev",
    width: 200,
    editable: false,
    renderCell: (params) => {
      return (
        <LessonAccDen
          lessonId={params.row.lessonId}
          setPost={params.row.setPost}
        />
      );
    },
  },
];

export default function DataGridDemo() {
  const [rows, setRows] = useState(null); // Drži podatke za DataGrid
  const [post, setPost] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          ApiConfig.API_URL + "/mojelekcije/ucitelj/novizahtjevi",
          {
            method: "GET",
            credentials: "include", // Ako je potrebno za autentifikaciju
          }
        );

        if (response.ok) {
          const data = await response.json();

          // Pretvaramo podatke u odgovarajući format za DataGrid
          const transformedData = data.map((item, index) => ({
            status: item.status,
            id: index + 1,
            name: item.ucenikName,

            timestampPocetka: dayjs(item.timestampPocetka)
              .tz("Europe/Paris") // Convert to GMT+1 (Paris time zone)
              .format("dddd, DD.MM.YYYY HH:mm"), // Adjust format if needed
            timestampZavrsetka: dayjs(item.timestampZavrsetka)
              .tz("Europe/Paris")
              .format("dddd, DD.MM.YYYY HH:mm"),

            lessonId: item.id,
            setPost: setPost, // Pass setPost function here
          }));

          setRows(transformedData); // Postavljamo podatke u rows
        } else {
          console.error("Error fetching data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(); // Pokrećemo dohvat podataka
  }, [post]);

  useEffect(() => {
    console.log("rows");
    console.log(rows);
  }, [rows]);

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
      <Typography variant="h6" sx={{ marginBottom: 2, color:"rgba(61, 76, 243, 0.582)" }}>
        Novi zahtjevi
      </Typography>

      <Box
        sx={{
          height: "70%",
          width: "70%", // Set the width to 70% of the screen
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(61, 76, 243, 0.582)", // Add background color for the grid area
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
