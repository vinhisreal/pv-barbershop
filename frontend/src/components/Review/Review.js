import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Avatar, Card, CardContent, Typography, Box } from "@mui/material";
import styles from "./Review.module.scss";
import classNames from "classnames/bind";
import { getAllReviews } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);

const Review = () => {
  const dispatch = useDispatch();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllReviews(dispatch);
      setReviews(data || []);
    };
    fetchData();
  }, []);
  const { t } = useTranslation();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ p: 4 }}>
      <h1 className={cx("subtitle")}>{t("review.subtitle")}</h1>
      <h1 className={cx("title")}>{t("review.title")}</h1>

      {/* Bọc slider trong container có margin âm để bù cho padding từng slide */}
      <Box sx={{ mx: "-5px" }}>
        <Slider {...settings}>
          {reviews.map((review) => (
            // Padding ngang 5px tạo khoảng cách 10px giữa các slide
            <Box key={review._id} sx={{ px: "5px" }}>
              <Card elevation={3} sx={{ borderRadius: 3, p: 2 }}>
                <Box display="flex" alignItems="center" mb={1}>
                  <Avatar src={review.barber?.user_avatar} alt={review.barber?.user_name} />
                  <Box ml={2}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {review.customer}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Barber: {review.barber?.user_name}
                    </Typography>
                  </Box>
                </Box>
                <CardContent>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    “{review.comment}”
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {review.service.map((s) => s.service_name).join(", ") ||
                      t("review.noService")}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default Review;
