import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { updateCategory } from "../../store/inspirationSlice";
import { useDispatch, useSelector } from "react-redux";

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

export default function UpdateCategoryModal({ open, close, id, title }) {
  const dispatch = useDispatch();
  useEffect(() => {
    setCategory(title);
  }, [title, id]);

  const [category, setCategory] = useState("");

  const submitHandler = () => {
    const data = { id, category };
    dispatch(updateCategory(data));
    setCategory("");
    close();
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
            Update
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
