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

function InspirationProduct({ data, categoryData }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState("");
  const [primaryImage, setPrimaryImage] = useState("");
  const [title, setTitle] = useState("");
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
    <div
      className="product__layout__home__wrapper"
      style={{
        margin: "0px",
      }}
    >
      <div className="product__layout__home__left__drawer">
        <div
          className="product__layout__home__left__drawer__content"
          style={{
            paddingTop: "10px",
          }}
        >
          <Button
            variant="contained"
            component="label"
            onClick={() => router.push("/inspiration")}
          >
            Add New
          </Button>
          {data?.map((d) => (
            <Link key={d?.id} href={`/inspiration?id=${d?.id}`}>
              {d?.title}
            </Link>
          ))}
        </div>
      </div>
      <div className="product__layout__home__right__drawer">
        <div
          className="product__layout__home__left__drawer__content"
          style={{
            paddingTop: "0px",
          }}
        >
          <h2>Add Details</h2>

          {loading ? (
            <>
              <h1>Loading</h1>
            </>
          ) : (
            <>
              <div className="details__box__wrapper">
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
              </div>
              <Divider />

              <div className="details__box__wrapper">
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
              </div>
              <Divider />

              <div className="details__box__wrapper">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={category}
                      label="Category"
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {categoryData?.map((c) => (
                        <MenuItem key={c?.id} value={c?.id}>
                          {c?.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </div>
              <Divider />

              <div className="details__box__wrapper">
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
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Title"
                    multiline
                    maxRows={4}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Box>
              </div>
              <Divider />

              <div className="details__box__wrapper">
                <Button
                  variant="contained"
                  component="label"
                  onClick={() => deleteHandler()}
                  style={{
                    opacity: id ? 1 : 0,
                    pointerEvents: id ? "all" : "none",
                  }}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  component="label"
                  onClick={() => submitHandler()}
                >
                  Submit
                </Button>
              </div>

              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity={error ? "error" : "success"}
                  sx={{ width: "100%" }}
                >
                  {error ? "Please fill all fields" : "Success"}
                </Alert>
              </Snackbar>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default InspirationProduct;
