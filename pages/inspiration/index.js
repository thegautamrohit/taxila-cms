import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import InspirationCategory from "../../components/Inspiration/InspirationCategory";
import InspirationProduct from "../../components/Inspiration/InspirationProduct";
import DrawerLeft from "../../components/Inspiration/leftDrawer";
import Table from "../../components/Inspiration/table";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Index({ data, categoryData }) {
  const [mainImage, setMainImage] = useState();
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [miniTile, setMiniTile] = useState("");
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ position: "relative" }}>
      <DrawerLeft />
    </div>
  );
}

export default Index;

// export async function getServerSideProps(context) {
//   const { data } = await axios.get(
//     `${process.env.NEXT_PUBLIC_CUSTOM}/api/inspiration`
//   );

//   let category = await axios.get(
//     `${process.env.NEXT_PUBLIC_CUSTOM}/api/inspirationCategory`
//   );

//   return {
//     props: {
//       data: data.result,
//       categoryData: category.data.result,
//     },
//   };
// }
