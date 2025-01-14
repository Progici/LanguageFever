import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Typography, Button } from "@mui/material";
import AdminDel from "./AdminDel.jsx";
import AddUser from "./AddUser.jsx";
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
        <AdminDel
          idKorisnika={params.row.userId}
          setPost={params.row.setPost}
        />
      );
    },
  },
];

export default function AdminOptions() {
  const [rows, setRows] = useState(null); // Drži podatke za DataGrid
  const [post, setPost] = useState(false);
  const [activeSection, setActiveSection] = useState("manage"); // "manage" or "add"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(ApiConfig.API_URL + "/korisnici", {
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

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* Naslov */}
      <Typography variant="h5" sx={{ marginBottom: 3 }}>
        Odaberite jednu opciju
      </Typography>

      {/* Gumbi za navigaciju */}
      <Box sx={{ display: "flex", gap: 2, marginBottom: 3 }}>
        <Button
          variant={activeSection === "add" ? "contained" : "outlined"}
          onClick={() => setActiveSection("add")}
        >
          Dodaj korisnika
        </Button>
        <Button
          variant={activeSection === "manage" ? "contained" : "outlined"}
          onClick={() => setActiveSection("manage")}
        >
          Upravljaj korisnicima
        </Button>
      </Box>

      {/* Prikaz aktivne sekcije */}
      {activeSection === "manage" && (
        <Box
          sx={{
            height: "70%",
            width: "70%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            borderRadius: 2,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <DataGrid
            rows={rows || []}
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
      )}

      {activeSection === "add" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            borderRadius: 2,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            padding: 3,
            width: "50%",
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Dodavanje korisnika (implementacija u toku)
          </Typography>
          <AddUser></AddUser>
        </Box>
      )}
    </Box>
  );
}
