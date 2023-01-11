import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AttachmentIcon from "@mui/icons-material/Attachment";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../Common/Alert";
import Snackbar from "@mui/material/Snackbar";
import Image from "next/image";
import { addItem } from "../../store/mediaSlice";

function MediaForm() {
  const [image, setImage] = useState();
  const [category, setCategory] = useState("");
  const [website, setWebsite] = useState("");
  const [date, setDate] = useState("");
  const [edition, setEdition] = useState("");
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [error, setError] = useState(false);
  const [preview, setPreview] = useState();

  const dispatch = useDispatch();

  const categories = useSelector((state) => state.mediaSlice.categories);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen2(false);
  };

  const successMsg = () => {
    setError(false);
    setOpen2(true);
  };

  const errorMsg = () => {
    setError(true);
    setOpen2(true);
  };

  const submitHandler = () => {
    if (
      title.trim().length > 0 &&
      category.trim().length > 0 &&
      website.trim().length &&
      date.trim().length &&
      edition.trim().length &&
      link.trim().length &&
      preview.trim().length
    ) {
      let data = {
        title,
        category,
        website,
        date,
        edition,
        link,
        preview,
        success: successMsg,
      };

      dispatch(addItem(data));
    } else {
      errorMsg();
    }
  };

  const ImageConverter = (e) => {
    const reader = new FileReader();

    reader.readAsDataURL(e);

    reader.onload = () => {
      console.log("called: ", reader);
      setPreview(reader.result);
    };
    e = "";
  };

  const style = {
    bgcolor: "background.paper",

    p: 4,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: "4rem",
    minHeight: "100px",
  };

  return (
    <div>
      <Box component="form" sx={style} noValidate autoComplete="off">
        <Button variant="contained" component="label" color="primary">
          Image <AttachmentIcon />
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.heic"
            hidden
            onChange={(e) => ImageConverter(e.target.files[0])}
          />
        </Button>

        {preview && (
          <Image
            src={preview}
            alt="preview"
            height={100}
            width={100}
            intrinsic="true"
            style={{
              objectFit: "contain",
            }}
          />
        )}
      </Box>

      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 3, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories?.map((category) => (
                <MenuItem value={category?.category}>
                  {" "}
                  {category?.category}{" "}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
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

      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 3, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Stack direction="row" spacing={3}>
          <Button
            variant="contained"
            component="label"
            onClick={() => submitHandler()}
          >
            Submit
          </Button>
        </Stack>
      </Box>
      <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={error ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {error ? "Please fill all fields" : "Success"}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default MediaForm;
