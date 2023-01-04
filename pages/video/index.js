import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Link from "next/link";
import { useRouter } from "next/router";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Index({ data }) {
  const [category, setCategory] = useState("");
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const clickHandler = () => {
    if (router.query.id) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_CUSTOM}/api/video?id=${router.query?.id}`
        )
        .then((res) => {
          console.log(res.data.result[0]);
          setCategory(res.data.result[0]?.category);
          setLink(res.data.result[0]?.link);
          setTitle(res.data.result[0]?.title);
          setId(res.data.result[0]?.id);

          setLoading(false);
        });
    } else {
      setCategory("");
      setLink("");
      setTitle("");
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    clickHandler();
  }, [router.query]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const submitHandler = () => {
    if (category.trim().length > 0 && link.trim().length > 0) {
      if (id) {
        axios
          .patch(`${process.env.NEXT_PUBLIC_CUSTOM}/api/video?id=${id}`, {
            category,
            link,
            company: "Taxila Stone",
            title,
          })
          .then((res) => {
            setError(false);
            setOpen(true);
            router.push("/video");
          });
      } else {
        axios
          .post(`${process.env.NEXT_PUBLIC_CUSTOM}/api/video`, {
            category,
            link,
            company: "Taxila Stone",
            title,
          })
          .then((res) => {
            setError(false);
            setOpen(true);
            router.push("/video");
          });
      }
    } else {
      setError(true);
      setOpen(true);
    }
  };

  const deleteHandler = () => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_CUSTOM}/api/video?id=${id}`)
      .then((res) => router.push("/video"));
  };

  return (
    <>
      <div className="product__layout__home__wrapper">
        <div className="product__layout__home__left__drawer">
          <div className="product__layout__home__left__drawer__content">
            <Button
              variant="contained"
              component="label"
              onClick={() => router.push("/video")}
            >
              Add New
            </Button>

            {data?.map((d) => (
              <Link href={`/video?id=${d?.id}`} key={d?.id}>
                {d?.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="product__layout__home__right__drawer">
          <h2>Add details</h2>

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

                  <TextField
                    id="outlined-multiline-flexible"
                    label="Title"
                    multiline
                    maxRows={4}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </Box>
              </div>
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
    </>
  );
}

export default Index;

export async function getServerSideProps(context) {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_CUSTOM}/api/video`
  );

  return {
    props: {
      data: data.result,
    },
  };
}
