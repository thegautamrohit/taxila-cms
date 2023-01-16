import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { addCategory } from "../../store/inspirationSlice";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import Alert from "../Common/Alert";
import Loader from "../Common/Loader";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};

export default function BasicModal({ open, close }) {
  const dispatch = useDispatch();
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const categoryData = useSelector((state) => state.inspirationSlice);
  const [category, setCategory] = useState("");

  const submitHandler = () => {
    dispatch(addCategory(category));
    setCategory("");
    close();
  };

  const handleClose = (event, reason) => {
    setOpenSnackBar(false);
  };

  return (
    <div>
      <Modal open={open} onClose={() => close()}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5">
            Add Category
          </Typography>
          <TextField
            id="outlined-multiline-flexible"
            label="Category"
            multiline
            maxRows={4}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ marginBottom: 20, marginTop: 20 }}
          />
          <Button
            variant="contained"
            component="label"
            onClick={() => submitHandler()}
          >
            Submit
          </Button>
        </Box>
      </Modal>
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
    </div>
  );
}
