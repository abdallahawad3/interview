import { memo } from "react";

import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

function DataTable() {
  return (
    <Paper
      sx={{ height: "100vh", width: "100%" }}
      style={{
        direction: "rtl",
      }}
    >
      <DataGrid rows={[]} columns={[]} />
    </Paper>
  );
}

export default memo(DataTable);
