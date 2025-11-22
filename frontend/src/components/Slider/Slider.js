import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { getActiveSliders } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
import classNames from "classnames/bind";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  Grid,
  Paper,
  Pagination,
  createTheme,
  useMediaQuery,
} from "@mui/material";

import styles from "./Slider.module.scss";

const cx = classNames.bind(styles);

function Slider() {
  const [slider, setSlider] = useState([]);
  const dispatch = useDispatch();

  const getSlider = async () => {
    const data = await getActiveSliders(dispatch);
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      const sliders = await getSlider();
      setSlider(sliders);
    };
    fetchData();
  }, []);

  const theme = createTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "lg"));

  return (
    <Container
      sx={{
        width: isMobile ? "82vw" : isTablet ? "72%" : "100%",
        marginTop: "40px",
        paddingLeft: { xs: 1, sm: 2 },
        paddingRight: { xs: 1, sm: 2 },
      }}
    >
      <Paper
        sx={{
          display: "block",
        }}
      >
        <Carousel
          infiniteLoop
          autoPlay
          interval={3000}
          showThumbs={false}
          showIndicators={true}
          showStatus={false}
          emulateTouch
          swipeable
        >
          {slider?.map((item, i) => (
            <Paper
              key={i}
              sx={{
                position: "relative",
                height: { xs: "200px", sm: "300px", md: "400px" },
                backgroundImage: `url(${item.slider_image})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                borderRadius: 1,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  position: "absolute",
                  bottom: 20,
                  left: 20,
                  color: "#fff",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  padding: "8px",
                  borderRadius: "4px",
                }}
              >
                {item.slider_content}
              </Typography>
            </Paper>
          ))}
        </Carousel>
      </Paper>
    </Container>
  );
}

export default Slider;
