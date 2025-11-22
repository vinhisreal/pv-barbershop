import React, { useEffect, useState } from "react";
import { Grid, Card, CardMedia } from "@mui/material";
import { styled } from "@mui/system";
import styles from "./LookBook.module.scss";
import classNames from "classnames/bind";
import { useTranslation } from "react-i18next";
import { getActiveLookbookCollection } from "../../redux/apiRequest";
const cx = classNames.bind(styles);

const images = [
  "https://res.cloudinary.com/vinhisreal/image/upload/v1744530337/pvbarbershop/1744530266820-472184538_614601234430458_5140422514991108968_n.jpg.jpg",
  "https://res.cloudinary.com/vinhisreal/image/upload/v1744528916/pvbarbershop/1744528845146-BIGBANG-GDragon-MAMA-2024-Cover-Photo.jpg.jpg",
  "https://res.cloudinary.com/vinhisreal/image/upload/v1744528950/pvbarbershop/1744528879546-hua-quang-han-tham-du-giai-thuong-dien-anh-baeksang-lan-59-voi-tu-cach-nguoi-trao-gia-2.jpg.jpg",
  "https://res.cloudinary.com/vinhisreal/image/upload/v1744529006/pvbarbershop/1744528935737-p3Qx8_5f.jpg.jpg",
  "https://res.cloudinary.com/vinhisreal/image/upload/v1744530383/pvbarbershop/1744530313129-489913944_18337233469091597_2956241697635874005_n.jpg.jpg",
  "https://res.cloudinary.com/vinhisreal/image/upload/v1744530623/pvbarbershop/1744530553593-425739457_905098971399007_1603812869306288503_n.jpg.jpg",
  "https://res.cloudinary.com/vinhisreal/image/upload/v1744529239/pvbarbershop/1744529165582-480587644_1224137549712776_6826957666366957282_n.jpg.jpg",
  "https://res.cloudinary.com/vinhisreal/image/upload/v1744529769/pvbarbershop/1744529694331-363793504_1908215872893548_2929361378794883358_n.jpg.jpg",
  "https://res.cloudinary.com/vinhisreal/image/upload/v1744530552/pvbarbershop/1744530482045-459311904_1545239976097211_843266163592352690_n.jpg.jpg",
  "https://res.cloudinary.com/vinhisreal/image/upload/v1744530956/pvbarbershop/1744530886121-5.jpg.jpg",
];

const StyledCard = styled(Card)({
  transition: "transform 0.3s ease-in-out",
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
});

const StyledCardMedia = styled(CardMedia)({
  width: "100%",
  height: "250px", // hoặc bất kỳ chiều cao cố định nào bạn muốn
  objectFit: "cover",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.1)",
  },
});

function LookBook() {
  const { t } = useTranslation();
  const [lookbookImages, setLookbookImages] = useState([]);

  const handleGetActiveLookbookCollection = async () => {
    try {
      const response = await getActiveLookbookCollection();
      // Lấy tất cả ảnh active của collection đầu tiên (hoặc bạn có thể map nhiều collection)
      setLookbookImages(response?.metadata[0]?.images || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleGetActiveLookbookCollection();
  }, []);
  return (
    <>
      <h1 className={cx("subtitle")}>{t("lookbook.subtitle")}</h1>
      <h1 className={cx("title")}>{t("lookbook.title")}</h1>
      <Grid container spacing={2} justifyContent="center" sx={{ pb: 4 }}>
        {lookbookImages.map((img, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
            <StyledCard>
              <StyledCardMedia
                component="img"
                image={img.url}
                alt={`Look ${index + 1}`}
              />
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default LookBook;
