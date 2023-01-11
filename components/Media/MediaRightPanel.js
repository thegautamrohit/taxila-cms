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
import { useSelector } from "react-redux";
import Loader from "../Common/Loader";
import Divider from "@mui/material/Divider";
import DeleteModal from "../Common/DeleteModal";
import MediaForm from "./MediaForm";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

function MediaRightPanel() {
  const items = useSelector((state) => state.mediaSlice?.items);
  const loading = useSelector((state) => state.mediaSlice?.loading);
  const [open, setOpen] = useState(false);

  console.log(items, loading);

  const deleteHandler = () => {
    setOpen(true);
  };

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 952 }}>
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <Grid item xs={12} md={6}>
          {items.length > 0 ? (
            <>
              <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                Select any item to edit
              </Typography>
              <Demo>
                <List>
                  {items?.map((i, index) => (
                    <>
                      <ListItem
                        key={index}
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
                        <ListItemAvatar>
                          <Avatar>
                            <EditIcon />
                          </Avatar>
                        </ListItemAvatar>
                      </ListItem>
                      <Divider />
                    </>
                  ))}
                </List>
              </Demo>
            </>
          ) : (
            <>
              <MediaForm />
            </>
          )}
        </Grid>
      )}

      {open && <DeleteModal open={open} setOpen={setOpen} />}
    </Box>
  );
}

export default MediaRightPanel;
