import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import MediaForm from "./MediaForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1100,
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "2rem",
};

export default function Media({ open, setOpen, activeItem }) {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <MediaForm activeItem={activeItem[0]} />

          {/* <Stack direction="row" spacing={2}>
            <Button variant="contained" color="error">
              YES
            </Button>

            <Button variant="contained" color="success">
              SUBMIT
            </Button>
          </Stack> */}
        </Box>
      </Modal>
    </div>
  );
}
