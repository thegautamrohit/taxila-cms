import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

function index() {
  const [mainImage, setMainImage] = useState();
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [miniTile, setMiniTile] = useState("");

  return (
    <div className="product__layout__home__wrapper">
      <div className="product__layout__home__left__drawer"></div>
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
                label="Title"
                multiline
                maxRows={4}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                id="outlined-multiline-flexible"
                label="Description"
                multiline
                maxRows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Box>
            <Divider />

            <div className="details__box__wrapper">
              <h4>Images</h4>

              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <Button variant="contained" component="label">
                  Main Image
                  <input
                    type="file"
                    hidden
                    value={mainImage}
                    onChange={(e) => setMainImage(e.target)}
                  />
                </Button>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
