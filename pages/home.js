import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
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
      icon: <HomeRoundedIcon fontSize={"large"} style={{ color: "#1976d2" }} />,
      title: "Home Page",
      url: "/home",
    },
    {
      id: 2,
      icon: <CategoryIcon fontSize={"large"} style={{ color: "#1976d2" }} />,
      title: "Add Product",
      url: "/product",
    },
    {
      id: 3,
      icon: <CountertopsIcon fontSize={"large"} style={{ color: "#1976d2" }} />,
      title: "Kitchen Section",
      url: "/home",
    },
    {
      id: 4,
      icon: <AppsIcon fontSize={"large"} style={{ color: "#1976d2" }} />,
      title: "Inspiration",
      url: "/home",
    },

    {
      id: 6,
      icon: <LiveTvIcon fontSize={"large"} style={{ color: "#1976d2" }} />,
      title: "Media",
      url: "/home",
    },

    {
      id: 8,
      icon: (
        <CloudDownloadIcon fontSize={"large"} style={{ color: "#1976d2" }} />
      ),
      title: "Download",
      url: "/home",
    },
    {
      id: 9,
      icon: <NewspaperIcon fontSize={"large"} style={{ color: "#1976d2" }} />,
      title: "Blogs",
      url: "/home",
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        display: "grid",
        rowGap: "30px",
        gridTemplateColumns: "auto auto auto",
        justifyContent: "space-evenly",
        alignItems: "center",
        margin: "50px auto",
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
            sx={{ maxWidth: 345 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CardActionArea>
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
            </CardActionArea>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default home;
