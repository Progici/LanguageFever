import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

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
    field: "status",
    headerName: "Status",
    width: 110,
    editable: true,
  },
];

const rows = [
  { id: 1, name: "John", email: "john@gmail.com", status: "AVAILABLE" },
  { id: 2, name: "John", email: "john@gmail.com", status: "AVAILABLE" },
  { id: 3, name: "John", email: "john@gmail.com", status: "AVAILABLE" },
  { id: 4, name: "John", email: "john@gmail.com", status: "AVAILABLE" },
];

export default function DataGridDemo() {
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
      />
    </Box>
  );
}
