import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Link from "next/link";
import { useRouter } from "next/router";
import Alert from "../../components/Common/Alert";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};
function AddInspirationProductModal({
  methodType,
  category,
  description,
  images,
  primaryImage,
  title,
  open,
  close,
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [openProduct, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [categoryProduct, setCategory] = useState("");
  const [descriptionProduct, setDescription] = useState("");
  const [imagesProduct, setImages] = useState("");
  const [primaryImageProduct, setPrimaryImage] = useState("");
  const [titleProduct, setTitle] = useState("");
  const [id, setId] = useState("");

  const clickHandler = () => {};
  const deleteHandler = () => {};
  const submitHandler = () => {
    if (
      category.trim().length > 0 &&
      description.trim().length > 0 &&
      title.trim().length > 0 &&
      primaryImage.trim().length > 0
    ) {
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const convertToBase64 = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e);

    reader.onload = () => {
      return reader.result;
    };
  };

  console.log(images);

  const imageHandler = (files) => {
    const images = Array.prototype.slice.call(files);

    // images.map((i) => setImages(...images, convertToBase64(i)));
    images.map((i) => console.log(convertToBase64(i)));
  };

  return (
    <Modal open={open} onClose={() => close()}>
      <Box sx={style}>
        <Box>
          <Button variant="contained" component="label">
            Primary Image
            <input
              type="file"
              multiple
              hidden
              onChange={(e) => {
                setPrimaryImage(e.target.files[0]);
                console.log(e);
              }}
            />
          </Button>

          {primaryImage && (
            <img
              style={{
                objectFit: "contain",
                height: "20%",
                width: "20%",
              }}
              src={URL.createObjectURL(primaryImage)}
              alt=""
            />
          )}
        </Box>

        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button variant="contained" component="label">
            Products
            <input
              type="file"
              multiple
              hidden
              onChange={(e) => imageHandler(e.target.files)}
            />
          </Button>
        </Box>

        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={categoryProduct}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              {/* {categoryData?.map((c) => (
                <MenuItem key={c?.id} value={c?.id}>
                  {c?.title}
                </MenuItem>
              ))} */}
            </Select>
          </FormControl>
        </Box>

        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-multiline-flexible"
            label="Description"
            multiline
            maxRows={4}
            value={descriptionProduct}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Title"
            multiline
            maxRows={4}
            value={titleProduct}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Box>

        <Button
          variant="contained"
          component="label"
          onClick={() => submitHandler()}
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
}

export default AddInspirationProductModal;
