import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CategoryIcon from "@mui/icons-material/Category";
import CircleIcon from "@mui/icons-material/Circle";
import axios from "axios";
import FloatingButton from "../Common/FloatingButton";
import Table from "../Inspiration/table";
import { useDispatch, useSelector } from "react-redux";
import ModalAddCategory from "./addCategoryModal";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import UpdateCategoryModal from "./updateCategoryModal";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  fetchCategory,
  fetchCategorySpecificData,
  deleteCategory,
} from "../../store/inspirationSlice";
import AddInspirationProductModal from "./addProduct";
const drawerWidth = 340;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function DrawerLeft() {
  const category = useSelector((state) => state.inspirationSlice.category);
  const dispatch = useDispatch();
  React.useEffect(() => {
    console.log("DrawerLeft");
    dispatch(fetchCategory("test"));
  }, []);

  const theme = useTheme();
  const [id, setId] = React.useState("");
  const [title, setTitle] = useState("");
  const [open, setOpen] = React.useState(false);
  const [openCategory, setOpenCategory] = React.useState(true);
  const [openCategoryModal, setOpenCategoryModal] = React.useState(false);
  const [updateCategoryModal, setUpdateCategoryModal] = React.useState(false);
  const [addProductModal, setAddProductModal] = React.useState(false);
  const handleClick = () => {
    setOpenCategory(!openCategory);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const updateCategory = (id, title) => {
    setId(id);
    setTitle(title);
    setUpdateCategoryModal(true);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        style={{ width: 300, left: 0, boxShadow: "none" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            <Link
              href="/home"
              style={{ color: "white", textDecoration: "none" }}
            >
              Taxila CMS
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader style={{ background: "#1976d2" }}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon style={{ color: "white" }} />
            ) : (
              <ChevronRightIcon style={{ color: "white" }} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="All Category" />
            {openCategory ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openCategory} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {category?.map((text, index) => (
                <ListItem disablePadding key={index}>
                  <ListItemButton>
                    <ListItemIcon>
                      <CircleIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={text.title}
                      onClick={() =>
                        dispatch(fetchCategorySpecificData(text.id))
                      }
                    />

                    <ListItemIcon>
                      <UpgradeIcon
                        onClick={() => updateCategory(text.id, text.title)}
                      />
                    </ListItemIcon>
                    <ListItemIcon>
                      <DeleteIcon
                        onClick={() => dispatch(deleteCategory(text.id))}
                      />
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </List>
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Table />
        <FloatingButton
          name="Add Product"
          bottom={50}
          open={() => setAddProductModal(true)}
        />
        <FloatingButton
          name="Add Category"
          bottom={120}
          open={() => setOpenCategoryModal(true)}
        />
      </Main>
      <ModalAddCategory
        open={openCategoryModal}
        close={() => setOpenCategoryModal(false)}
      />
      <UpdateCategoryModal
        id={id}
        title={title}
        open={updateCategoryModal}
        close={() => setUpdateCategoryModal(false)}
      />
      <AddInspirationProductModal
        open={addProductModal}
        close={() => setAddProductModal(false)}
        methodType="create"
      />
    </Box>
  );
}
