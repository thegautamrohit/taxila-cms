import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import axios from "axios";

function index({ data }) {
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [website, setWebsite] = useState("");
  const [date, setDate] = useState("");
  const [edition, setEdition] = useState("");
  const [link, setLink] = useState("");

  console.log(data);

  return (
    <div className="product__layout__home__wrapper">
      <div className="product__layout__home__left__drawer">
        <div className="product__layout__home__left__drawer__content">
          <ul>
            <li>Media</li>
            <li>Media</li>
            <li>Media</li>
            <li>Media</li>
            <li>Media</li>
            <li>Media</li>
            <li>Media</li>
            <li>Media</li>
            <li>Media</li>
          </ul>
        </div>
      </div>
      <div className="product__layout__home__right__drawer">
        <div className="product__layout__home__left__drawer__content">
          <h2>Add Details</h2>

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
                  value={image}
                  onChange={(e) => setImage(e.target)}
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
              <TextField
                id="outlined-multiline-flexible"
                label="Category"
                multiline
                maxRows={4}
                value={link}
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
            <Button variant="contained" component="label">
              Submit
            </Button>
          </div>
        </div>
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
