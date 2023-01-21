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
import Image from "next/image";
// import imageToBase64 from "image-to-base64";

function Index({ data }) {
  const [image, setImage] = useState();
  const [category, setCategory] = useState("");
  const [website, setWebsite] = useState("");
  const [date, setDate] = useState("");
  const [edition, setEdition] = useState("");
  const [link, setLink] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [preview, setPreview] = useState();

  const router = useRouter();

  const convertToBase64 = (e) => {
    const reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]);

    reader.onload = () => {
      setPreview(reader.result);
    };
  };

  const clickHandler = () => {
    if (router.query.id) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_CUSTOM}/api/media?id=${router.query?.id}`
        )
        .then((res) => {
          setCategory(res.data.result[0]?.category);
          setWebsite(res.data.result[0]?.website);
          setDate(res.data.result[0]?.date);
          setEdition(res.data.result[0]?.edition);
          setLink(res.data.result[0]?.link);
          setId(res.data.result[0]?.id);
          setPreview(res.data.result[0]?.images);

          setLoading(false);
        });
    } else {
      setCategory("");
      setWebsite("");
      setDate("");
      setEdition("");
      setLink("");
      setId("");
      setImage("");
      setLoading(false);
      setPreview();
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

  const deleteHandler = () => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_CUSTOM}/api/media?id=${id}`)
      .then((res) => router.push("/media"));
  };

  const submitHandler = () => {
    if (
      category.trim().length > 0 &&
      website.trim().length &&
      date.trim().length &&
      edition.trim().length &&
      link.trim().length &&
      preview.trim().length
    ) {
      if (id) {
        axios
          .patch(`${process.env.NEXT_PUBLIC_CUSTOM}/api/media?id=${id}`, {
            category,
            website,
            date,
            edition,
            link,
            images: preview,
          })
          .then((res) => {
            setError(false);
            setOpen(true);
            router.push("/media");
          });
      } else {
        axios
          .post(`${process.env.NEXT_PUBLIC_CUSTOM}/api/media`, {
            category,
            website,
            date,
            edition,
            link,
            images: preview,
          })
          .then((res) => {
            setError(false);
            setOpen(true);
            router.push("/media");
          });
      }
    } else {
      setError(true);
      setOpen(true);
    }
  };

  return (
    <div className="product__layout__home__wrapper">
      <div className="product__layout__home__left__drawer">
        <div className="product__layout__home__left__drawer__content">
          <Button
            variant="contained"
            component="label"
            onClick={() => router.push("/media")}
          >
            Add New
          </Button>
          {data?.map((d) => (
            <Link key={d?.id} href={`/media?id=${d?.id}`}>
              {d?.link}
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
                  <Button variant="contained" component="label">
                    Image
                    <input
                      type="file"
                      hidden
                      onChange={(e) => convertToBase64(e)}
                    />
                  </Button>

                  <img src={preview} alt="" />
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
                    label="Category"
                    multiline
                    maxRows={4}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Website/Magazine"
                    multiline
                    maxRows={4}
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Date"
                    multiline
                    maxRows={4}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Edition"
                    multiline
                    maxRows={4}
                    value={edition}
                    onChange={(e) => setEdition(e.target.value)}
                  />
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Link"
                    multiline
                    maxRows={4}
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
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

export default Index;

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
