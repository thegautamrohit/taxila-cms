import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import CategoryIcon from "@mui/icons-material/Category";
import CountertopsIcon from "@mui/icons-material/Countertops";
import AppsIcon from "@mui/icons-material/Apps";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import Link from "next/link";

function home() {
  const cards = [
    {
      id: 1,
      icon: (
        <HomeRoundedIcon
          style={{ color: "#1976d2", fontSize: "3.5rem !important" }}
        />
      ),
      title: "Home Page",
      url: "/home",
    },
    {
      id: 2,
      icon: (
        <CategoryIcon
          style={{ color: "#1976d2", fontSize: "3.5rem !important" }}
        />
      ),
      title: "Add Product",
      url: "/product",
    },
    {
      id: 3,
      icon: (
        <CountertopsIcon
          style={{ color: "#1976d2", fontSize: "3.5rem !important" }}
        />
      ),
      title: "Kitchen Section",
      url: "/home",
    },
    {
      id: 4,
      icon: (
        <AppsIcon style={{ color: "#1976d2", fontSize: "3.5rem !important" }} />
      ),
      title: "Inspiration",
      url: "/inspiration",
    },

    {
      id: 6,
      icon: (
        <LiveTvIcon
          style={{ color: "#1976d2", fontSize: "3.5rem !important" }}
        />
      ),
      title: "Media",
      url: "/media",
    },

    {
      id: 8,
      icon: (
        <CloudDownloadIcon
          style={{ color: "#1976d2", fontSize: "3.5rem !important" }}
        />
      ),
      title: "Download",
      url: "/home",
    },
    {
      id: 9,
      icon: (
        <NewspaperIcon
          style={{ color: "#1976d2", fontSize: "3.5rem !important" }}
        />
      ),
      title: "Blogs",
      url: "/blogs",
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        display: "grid",
        rowGap: "30px",
        gridTemplateColumns: "200px 200px 200px",
        justifyContent: "space-evenly",
        alignItems: "center",
        margin: "120px auto",
      }}
    >
      {cards?.map((card) => (
        <Link
          key={card?.id}
          href={card.url}
          style={{
            textDecoration: "none",
          }}
        >
          <Card
            sx={{ maxWidth: 345, height: 200 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <CardActionArea> */}
            <CardContent
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography gutterBottom variant="h5" component="div">
                {card?.icon}
              </Typography>
              <Typography variant="body" color="text.primary">
                {card?.title}
              </Typography>
            </CardContent>
            {/* </CardActionArea> */}
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default home;
