import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "../Common/Alert";
import { useSelector } from "react-redux";
const SnackBar = () => {
  const categoryData = useSelector((state) => state.inspirationSlice);
  return (
    <Snackbar
      open={categoryData.error || categoryData.success}
      autoHideDuration={6000}
    >
      <Alert
        severity={categoryData.error ? "error" : "success"}
        sx={{ width: "100%" }}
      >
        {categoryData.error ? categoryData.error : categoryData.success}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
