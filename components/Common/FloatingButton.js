import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

export default function FloatingActionButtons({ name, bottom, open }) {
  return (
    <Fab
      onClick={() => open()}
      variant="extended"
      style={{
        position: "fixed",
        right: 50,
        bottom: bottom,
        color: "white",
        backgroundColor: "#1976d2",
      }}
    >
      <AddIcon sx={{ mr: 1 }} />
      {name}
    </Fab>
  );
}
