import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import loader from "../../image/Pulse.gif";
import Image from "next/image";

export default function Loader() {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={3}>
        <Box sx={{ display: "flex" }}>
          <Image src={loader} alt="Loader"  />
        </Box>
      </Grid>
    </Grid>
  );
}
