import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import LessonAccDen from "../forms/LessonAccDen.jsx";
import { ApiConfig } from "../../config/api.config";
const columns = [
  { field: "id", headerName: "Broj", width: 90 },
  {
    field: "name",
    headerName: "Ime",
    width: 150,
    editable: true,
  },
  {
    field: "email",
    headerName: "E-mail",
    width: 150,
    editable: true,
  },
  {
    field: "lesson",
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
      return <LessonAccDen lessonId={params.row.lesson} />;
    },
  },
];

const rows = [
  { id: 1, name: "John", email: "john@gmail.com", lesson: "Lekcija 1" },
  { id: 2, name: "John", email: "john@gmail.com" },
  { id: 3, name: "John", email: "john@gmail.com" },
  { id: 4, name: "John", email: "john@gmail.com" },
];

export default function DataGridDemo() {
  // const [rows, setRows] = useState([]); // Drži podatke za DataGrid
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         ApiConfig.API_URL + "/mojelekcije/ucitelj/novizahtjevi",
  //         {
  //           method: "GET",
  //           credentials: "include", // Ako je potrebno za autentifikaciju
  //         }
  //       );

  //       if (response.ok) {
  //         const data = await response.json();

  //         // Pretvaramo podatke u odgovarajući format za DataGrid
  //         const transformedData = data.map((item, index) => ({
  //           id: index + 1,
  //           name: item.name,
  //           email: item.email,
  //           lesson: item.lesson.id, //dario help :(
  //         }));

  //         setRows(transformedData); // Postavljamo podatke u rows
  //       } else {
  //         console.error("Error fetching data:", response.status);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchData(); // Pokrećemo dohvat podataka
  // }, []);

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
