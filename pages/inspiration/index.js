import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import InspirationCategory from "../../components/Inspiration/InspirationCategory";
import InspirationProduct from "../../components/Inspiration/InspirationProduct";

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

function index({ data, categoryData }) {
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
    <>
      <Box sx={{ width: "100%", marginTop: "75px" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered
          >
            <Tab label="Category" {...a11yProps(0)} />
            <Tab label="Product" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <InspirationCategory data={categoryData} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <InspirationProduct data={data} categoryData={categoryData} />
        </TabPanel>
      </Box>
    </>
  );
}

export default index;

export async function getServerSideProps(context) {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_CUSTOM}/api/inspiration`
  );

  let category = await axios.get(
    `${process.env.NEXT_PUBLIC_CUSTOM}/api/inspirationCategory`
  );

  return {
    props: {
      data: data.result,
      categoryData: category.data.result,
    },
  };
}
