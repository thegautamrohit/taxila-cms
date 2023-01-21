import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import EditIcon from "@mui/icons-material/Edit";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Common/Loader";
import Divider from "@mui/material/Divider";
import DeleteModal from "../Common/DeleteModal";
import MediaForm from "./MediaForm";
import MediaModal from "./MediaModal";
import { getActiveItem } from "../../store/mediaSlice";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

function MediaRightPanel() {
  const items = useSelector((state) => state.mediaSlice?.items);
  const loading = useSelector((state) => state.mediaSlice?.loading);
  const activeItem = useSelector((state) => state.mediaSlice?.activeItem);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const deleteHandler = () => {
    setOpen(true);
  };

  const modalHandler = (id) => {
    setOpen2(true);
    dispatch(getActiveItem(id));
  };

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 952 }}>
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <Grid
          item
          xs={12}
          md={6}
          style={{
            margin: "0 auto",
          }}
        >
          {items.length > 0 ? (
            <Box
              style={{
                margin: "0 auto",
              }}
            >
              <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                Select any item to edit
              </Typography>
              <Demo>
                <List>
                  {items?.map((i, index) => (
                    <div key={index}>
                      <ListItem
                        secondaryAction={
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => deleteHandler()}
                          >
                            <DeleteIcon />
                          </IconButton>
                        }
                      >
                        <ListItemText primary={i?.Name} />
                        <ListItemAvatar onClick={() => modalHandler(i?.id)}>
                          <Avatar>
                            <EditIcon />
                          </Avatar>
                        </ListItemAvatar>
                      </ListItem>
                      <Divider />
                    </div>
                  ))}
                </List>
              </Demo>
            </Box>
          ) : (
            <>
              <MediaForm />
            </>
          )}
        </Grid>
      )}

      {open && <DeleteModal open={open} setOpen={setOpen} />}
      {open2 && (
        <MediaModal activeItem={activeItem} open={open2} setOpen={setOpen2} />
      )}
    </Box>
  );
}

export default MediaRightPanel;
