import "../styles/globals.css";
import { Provider } from "react-redux";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { wrapper, store } from "../store/store";

const ButtonAppBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Taxila CMS
          </Typography>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <ButtonAppBar />
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
