import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import AdminDel from "../forms/AdminDel.jsx";
import { useState, useEffect } from "react";
import { ApiConfig } from "../../config/api.config.js";

const columns = [
  { field: "id", headerName: "Broj", width: 90 },

  {
    field: "userId",
    headerName: "ID korisnika",
    type: "number",
    width: 110,
    editable: false,
  },
  {
    field: "firstName",
    headerName: "Ime korisnika",
    width: 150,
    editable: false,
  },

  {
    field: "email",
    headerName: "E-mail",
    width: 150,
    editable: false,
  },

  {
    field: "action",
    headerName: "Radnja",
    width: 200,
    sortable: false,
    editable: false,
    renderCell: (params) => {
      return (
        // lessonId={params.row.lessonId} setPost={params.row.setPost}
        <AdminDel
          idKorisnika={params.row.userId}
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
        const response = await fetch(ApiConfig.API_URL + "/users", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          console.log("PODATCI");
          console.log(data);
          // Pretvaramo podatke u odgovarajući format za DataGrid
          const transformedData = data.map((item, index) => ({
            id: index + 1,
            userId: item.id,
            firstName: item.name,
            email: item.email,
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
      {/* Title centered above the grid */}
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Izbrišite željenog korisnika ili ga postavite za admina
      </Typography>

      <Box
        sx={{
          height: "70%",
          width: "70%", // Set the width to 70% of the screen
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff", // Add background color for the grid area
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
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
        />
      </Box>
    </Box>
  );
}
