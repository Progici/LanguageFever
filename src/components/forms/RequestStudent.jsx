import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import LessonAccDen from "../forms/LessonAccDen.jsx";
import { ApiConfig } from "../../config/api.config";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const columns = [
  { field: "id", headerName: "Broj", width: 90, editable: false },
  {
    field: "name",
    headerName: "Ime",
    width: 150,
    editable: false,
  },
  {
    field: "timestampPocetka",
    headerName: "Početak",
    width: 250,
    editable: false,
  },
  {
    field: "timestampZavrsetka",
    headerName: "Završetak",
    width: 250,
    editable: false,
  },
];

export default function DataGridDemo() {
  const [rows, setRows] = useState(null); // Drži podatke za DataGrid
  const [post, setPost] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          ApiConfig.API_URL + "/mojelekcije/ucenik/prihvacenizahtjevi",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();

          // Pretvaramo podatke u odgovarajući format za DataGrid
          const transformedData = data.map((item, index) => ({
            id: index + 1,
            name: item.uciteljName,

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
        backgroundColor: "#f5f5f5", // Optional: Add background color for better visibility
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Vaše prihvaćene lekcije
      </Typography>

      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
      />
    </Box>
  );
}
