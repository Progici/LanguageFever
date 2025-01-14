import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Typography, Button, TextField, FormControl } from "@mui/material";
import AdminDel from "./miniComponents/AdminDel.jsx";
import SelectTextbox from "./miniComponents/SelectTextbox.jsx";
import { useState, useEffect } from "react";
import { ApiConfig } from "../../config/api.config.js";

const columns = [
  { field: "id", headerName: "Broj", width: 50 },
  {
    field: "userId",
    headerName: "ID",
    type: "number",
    width: 50,
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
    width: 200,
    editable: false,
  },
  {
    field: "role",
    headerName: "Uloga",
    width: 150,
    editable: false,
  },
  {
    field: "action",
    headerName: "Radnja",
    width: 250,
    sortable: false,
    editable: false,
    renderCell: (params) => {
      return (
        <AdminDel
          idKorisnika={params.row.userId}
          setPost={params.row.setPost}
          role={params.row.role}
        />
      );
    },
  },
];

export default function AdminOptions() {
  const [rows, setRows] = useState([]); // Holds data for DataGrid
  const [post, setPost] = useState(false);
  const [activeSection, setActiveSection] = useState("manage"); // "manage" or "add"
  const [newUser, setNewUser] = useState({ name: "", email: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(ApiConfig.API_URL + "/korisnici", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          // Transform data for DataGrid
          const transformedData = data.map((item, index) => ({
            id: index + 1,
            userId: item.id,
            firstName: item.name,
            email: item.email,
            role: item.role,
            setPost: setPost, // Pass setPost function here
          }));

          setRows(transformedData);
        } else {
          console.error("Error fetching data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [post]);

  const handleAddUser = async () => {
    try {
      if (!newUser.name || !newUser.email) {
        alert("Sva polja su obavezna!");
        return;
      }

      const data = {
        name: newUser.name,
        email: newUser.email,
        role: "ROLE_USER",
      };

      const response = await fetch(ApiConfig.API_URL + `/korisnici`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setPost(!post); // Refresh user list
        setNewUser({ name: "", email: "" }); // Reset the form
      } else {
        console.error("Greška prilikom dodavanja korisnika:", response.status);
      }
    } catch (error) {
      console.error("Greška:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
    console.log(newUser);
  };

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
      {/* Navigation Buttons */}
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

      {/* Active Section Display */}
      {activeSection === "manage" && (
        <>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Postavi ulogu korisnika kao Admin ili User ili ga obriši
          </Typography>
          <Box
            sx={{
              height: "70%",
              width: "70%",
              backgroundColor: "#fff",
              borderRadius: 2,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              padding: 2,
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
              sx={{ height: "100%" }}
            />
          </Box>
        </>
      )}

      {activeSection === "add" && (
        <>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Dodaj novog korisnika
          </Typography>
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
            <TextField
              name="name"
              label="Ime"
              variant="outlined"
              sx={{ marginBottom: 2, width: "100%" }}
              value={newUser.name}
              onChange={handleInputChange}
            />

            <TextField
              name="email"
              label="E-mail"
              variant="outlined"
              sx={{ marginBottom: 2, width: "100%" }}
              value={newUser.email}
              onChange={handleInputChange}
            />

            <Button variant="contained" onClick={handleAddUser}>
              Dodaj korisnika
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
