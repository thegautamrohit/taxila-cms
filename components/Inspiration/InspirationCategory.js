import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import Link from "next/link";
import { useRouter } from "next/router";
import Alert from "../Common/Alert";

function InspirationCategory({ data }) {
  const router = useRouter();

  const clickHandler = () => {
    if (router.query.id) {
      axios.get(
        `${process.env.NEXT_PUBLIC_CUSTOM}/api/inspiration?id=${router.query?.id}`
      );
    }
  };

  useEffect(() => {}, []);

  const [category, setCategory] = useState("");
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);

  const deleteHandler = () => {};
  const submitHandler = () => {
    console.log(category);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_CUSTOM}/api/inspirationCategory`,

        {
          title: category,
        }
      )
      .then((res) => console.log(res));
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
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
            paddingTop: "0px",
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
        <div className="product__layout__home__left__drawer__content">
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
                >
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Category"
                    multiline
                    maxRows={4}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
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

export default InspirationCategory;
