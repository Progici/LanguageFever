import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
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
    headerName: "Lekcija",
    width: 150,
    editable: true,
  },
];

const rows = [
  { id: 1, name: "John", email: "john@gmail.com", lesson: "Lekcija 1" },
  { id: 2, name: "John", email: "john@gmail.com" },
  { id: 3, name: "John", email: "john@gmail.com" },
  { id: 4, name: "John", email: "john@gmail.com" },
];

export default function DataGridDemo() {
  const [info, setInfo] = useState();
  const [selectedRows, setSelectedRows] = useState([]);

  // useEffect(() => {
  //   fetch(ApiConfig.API_URL + "/mojelekcije/ucitelj/novizahtjevi", {
  //     method: "GET",
  //     credentials: "include",
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Fetched data:", data);

  //       // Use map instead of forEach to return a new array
  //       const mappedInfo = data.map((info) => ({
  //         name: info.name,
  //         email: info.email,
  //         lesson: info.id, //popraviti
  //       }));

  //       console.log("Mapped lessons for FullCalendar:", mappedInfo);
  //       setInfo(mappedInfo);
  //     })
  //     .catch((error) => console.error("Error fetching lessons:", error));
  // }, []);

  const handleSaveSelected = () => {
    console.log("Selected Rows: ", selectedRows);
    // Možete dodati logiku za spremanje podataka ili slanje na API
  };
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
        checkboxSelection
        disableRowSelectionOnClick
        onSelectionModelChange={(newSelection) => {
          setSelectedRows(newSelection); // Ažuriraj stanje s odabranim redovima
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSaveSelected} // Pozivamo funkciju pri kliku
        sx={{ marginTop: 2 }}
      >
        Spremi Odabrane
      </Button>
    </Box>
  );
}
