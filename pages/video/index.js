import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function index({ data }) {
  console.log(data);

  const [category, setCategory] = useState("");
  const [link, setLink] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);

  const clickHandler = () => {};

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const submitHandler = () => {
    if (category.trim().length > 0 && link.trim().length > 0) {
      axios
        .post(`${process.env.NEXT_PUBLIC_CUSTOM}/api/video`, {
          category,
          link,
        })
        .then((res) => console.log(res));

      setError(false);
      setOpen(true);
    } else {
      setError(true);
      setOpen(true);
    }

    console.log("cliked");
  };

  return (
    <div className="product__layout__home__wrapper">
      <div className="product__layout__home__left__drawer">
        <div className="product__layout__home__left__drawer__content">
          <p>Select an item to edit</p>
          <ul>
            {data?.map((d) => (
              <li onClick={() => clickHandler(d?.id)} key={d?.id}>
                {d?.link}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="product__layout__home__right__drawer">
        <h2>Add details</h2>
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
              required
            />

            <TextField
              id="outlined-multiline-flexible"
              label="Link"
              multiline
              maxRows={4}
              value={link}
              onChange={(e) => setLink(e.target.value)}
              required
            />
          </Box>
        </div>
        <div className="details__box__wrapper">
          <Button
            variant="contained"
            component="label"
            onClick={() => submitHandler()}
          >
            Submit
          </Button>
        </div>

        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={error ? "error" : "success"}
            sx={{ width: "100%" }}
          >
            {error ? "Please fill all fields" : "Success"}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}

export default index;

export async function getServerSideProps(context) {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_CUSTOM}/api/media`
  );

  return {
    props: {
      data: data.result,
    },
  };
}
