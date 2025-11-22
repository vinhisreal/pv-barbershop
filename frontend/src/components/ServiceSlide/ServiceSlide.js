import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  IconButton,
  Box,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import styles from "./ServiceSlide.module.scss";
import classNames from "classnames/bind";
import { getAllServices } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);

export default function ServiceSlide() {
  const dispatch = useDispatch();
  const [services, setServices] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 5;

  const handleGetService = async () => {
    const res = await getAllServices(dispatch);
    if (res?.metadata) {
      const activeServices = res.metadata.filter((s) => s.isActive);
      const formatted = activeServices.map((item) => ({
        img: item.service_image,
        name: item.service_name,
        description: item.service_description,
      }));
      setServices(formatted);
    }
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + itemsPerPage) % services.length);
  };

  const handlePrev = () => {
    setStartIndex(
      (prev) => (prev - itemsPerPage + services.length) % services.length
    );
  };

  useEffect(() => {
    handleGetService();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000); // Mỗi 4 giây chuyển trang
    return () => clearInterval(interval);
  }, [services]);

  // Hiển thị 5 phần tử liên tục (vòng lặp circular)
  const visibleServices = [];
  for (let i = 0; i < itemsPerPage; i++) {
    const index = (startIndex + i) % services.length;
    visibleServices.push(services[index]);
  }

  const { t } = useTranslation();
  return (
    <Box className={cx("wrapper")} sx={{ padding: "40px 0" }}>
      <Typography variant="h5" align="center" className={cx("subtitle")}>
        {t("serviceSlide.subtitle")}
      </Typography>
      <Typography variant="h3" align="center" className={cx("title")}>
        {t("serviceSlide.title")}
      </Typography>

      <Grid
        container
        justifyContent="center"
        alignItems="stretch"
        spacing={2}
        mt={2}
        sx={{
          display: "flex",
          flexDirection: "row",
          transition: "transform 1s ease-in-out", // Thêm hiệu ứng chuyển động
        }}
      >
        {visibleServices.map((service, idx) => (
          <Grid item xs={12} sm={4} md={2.4} key={idx}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "transform 0.5s ease", // Giữ hiệu ứng khi hover
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <Box
                sx={{
                  height: 150,
                  backgroundImage: `url(${service?.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  flexGrow: 1,
                }}
              >
                <Box sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      minHeight: "50px",
                    }}
                  >
                    {service?.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mt: 1,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      minHeight: "60px",
                    }}
                  >
                    {service?.description}
                  </Typography>
                </Box>
                <Link
                  to="/services" // Đặt đường dẫn tới trang services
                  style={{
                    textDecoration: "none", // Loại bỏ gạch chân mặc định của Link
                    color: "inherit", // Đảm bảo màu sắc được giữ nguyên như khi không dùng Link
                  }}
                >
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 2,
                      backgroundColor: "var(--dark)",
                      color: "var(--white)",
                    }}
                  >
                    {t("serviceSlide.viewMore")}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box textAlign="center" mt={4}>
        <IconButton
          onClick={handlePrev}
          sx={{
            mx: 1,
            color: "var(--white)",
            backgroundColor: "var(--dark)",
          }}
        >
          <ArrowBack fontSize="small" />
        </IconButton>
        <IconButton
          onClick={handleNext}
          sx={{
            mx: 1,
            color: "var(--white)",
            backgroundColor: "var(--dark)",
          }}
        >
          <ArrowForward fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}
