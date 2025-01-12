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
  { field: "id", headerName: "Broj", width: 90 },
  {
    field: "name",
    headerName: "Ime",
    width: 150,
    editable: true,
  },
  {
    field: "timestampPocetka",
    headerName: "Početak",
    width: 250,
    editable: true,
  },
  {
    field: "timestampZavrsetka",
    headerName: "Završetak",
    width: 250,
    editable: true,
  },
  {
    field: "lessonId",
    headerName: "ID lekcije",
    width: 150,
    editable: true,
  },
  {
    field: "pick",
    headerName: "Zahtjev",
    width: 200,
    editable: false,
    renderCell: (params) => {
      return <LessonAccDen lessonId={params.row.lessonId} />;
    },
  },
];

export default function DataGridDemo() {
  const [rows, setRows] = useState(null); // Drži podatke za DataGrid
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
            id: index + 1,
            name: item.ucenikName,

            timestampPocetka: dayjs(item.timestampPocetka)
              .tz("Europe/Paris") // Convert to GMT+1 (Paris time zone)
              .format("dddd, DD.MM.YYYY HH:mm"), // Adjust format if needed
            timestampZavrsetka: dayjs(item.timestampZavrsetka)
              .tz("Europe/Paris")
              .format("dddd, DD.MM.YYYY HH:mm"),

            lessonId: item.id,
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
  }, []);

  useEffect(() => {
    console.log("rows");
    console.log(rows);
  }, [rows]);

  return (
    <Box sx={{ height: 400, width: "100%" }}>
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
