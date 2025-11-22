import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import {
  Facebook,
  Instagram,
  Twitter,
  Email,
  Phone,
  LocationOn,
} from "@mui/icons-material";
import styles from "./Footer.module.scss";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  contactViaEmail,
  getFooterCollectionsActive,
} from "../../../redux/apiRequest";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [footerImages, setFooterImages] = useState([]);
  const { t } = useTranslation();

  const handleSendContact = async () => {
    if (!email || !message) {
      toast.error(t("footer.errorMessage"));
      return;
    }

    try {
      await contactViaEmail({ email, message });
      toast.success(t("footer.successMessage"));
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error(err);
      toast.error(t("footer.errorMessage"));
    }
  };

  const handleGetActiveFooterCollection = async () => {
    try {
      const response = await getFooterCollectionsActive();
      setFooterImages(response?.metadata[0]?.images || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleGetActiveFooterCollection();
  }, []);

  return (
    <Box className={cx("footer-wrapper")}>
      {/* Hero Section with Background Image */}
      <Box className={cx("footer-hero")}>
        <Container style={{ maxWidth: "1400px" }}>
          <Typography variant="h4" className={cx("hero-title")}>
            {t("footer.brandSlogan") ||
              "Your comfort is not just based on physical things but on mental satisfaction"}
          </Typography>
          <Typography variant="body1" className={cx("hero-subtitle")}>
            {t("footer.brandName") || "FORM"}
          </Typography>
          <Typography variant="body2" className={cx("hero-description")}>
            {t("footer.heroDescription") ||
              "Natural Shaping Supports For Everyday"}
          </Typography>
        </Container>
      </Box>

      {/* Main Footer Content */}
      <Box className={cx("footer-content")}>
        <Container style={{ maxWidth: "1400px" }}>
          <Grid container spacing={6}>
            {/* Column 1: About Us */}
            <Grid item xs={12} md={3}>
              <Typography variant="h6" className={cx("footer-heading")}>
                {t("footer.aboutUs") || "About Us"}
              </Typography>
              <Typography variant="body2" className={cx("footer-text")}>
                {t("footer.aboutDescription") ||
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."}
              </Typography>
              <Box className={cx("social-icons")}>
                <IconButton className={cx("social-icon")}>
                  <Facebook />
                </IconButton>
                <IconButton className={cx("social-icon")}>
                  <Instagram />
                </IconButton>
                <IconButton className={cx("social-icon")}>
                  <Twitter />
                </IconButton>
              </Box>
            </Grid>

            {/* Column 2: Open Hours */}
            <Grid item xs={12} md={3}>
              <Typography variant="h6" className={cx("footer-heading")}>
                {t("footer.openHours") || "Open Hours"}
              </Typography>
              <Box className={cx("hours-list")}>
                <Box className={cx("hour-item")}>
                  <Typography variant="body2">Monday - Sat</Typography>
                  <Typography variant="body2">9:00 AM - 11:00 PM</Typography>
                </Box>
                <Box className={cx("hour-item")}>
                  <Typography variant="body2">Tuesday - Friday</Typography>
                  <Typography variant="body2">9:00 AM - 11:00 PM</Typography>
                </Box>
                <Box className={cx("hour-item")}>
                  <Typography variant="body2">Saturday - Sunday</Typography>
                  <Typography variant="body2">9:00 AM - 11:00 PM</Typography>
                </Box>
              </Box>
            </Grid>

            {/* Column 3: Address & Contact */}
            <Grid item xs={12} md={3}>
              <Typography variant="h6" className={cx("footer-heading")}>
                {t("footer.address") || "Address"}
              </Typography>
              <Box className={cx("contact-info")}>
                <Box className={cx("contact-item")}>
                  <LocationOn className={cx("contact-icon")} />
                  <Typography variant="body2">
                    {t("footer.addressDetail") || "Hanoi, Viet Nam"}
                  </Typography>
                </Box>
                <Box className={cx("contact-item")}>
                  <Email className={cx("contact-icon")} />
                  <Typography variant="body2">
                    thevi16102004@gmail.com
                  </Typography>
                </Box>
                <Box className={cx("contact-item")}>
                  <Phone className={cx("contact-icon")} />
                  <Typography variant="body2">+84 123 456 789</Typography>
                </Box>
              </Box>
            </Grid>

            {/* Column 4: Featured Images */}
            <Grid item xs={12} md={3}>
              <Typography variant="h6" className={cx("footer-heading")}>
                {t("footer.featuredImages") || "Featured Images"}
              </Typography>
              <Box className={cx("image-grid")}>
                {footerImages?.slice(0, 6).map((img, index) => (
                  <Box
                    key={index}
                    component="img"
                    src={img.url}
                    alt={`Featured ${index + 1}`}
                    className={cx("grid-image")}
                  />
                ))}
                {footerImages?.length === 0 && (
                  // Placeholder images if no images from API
                  <>
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <Box
                        key={num}
                        className={cx("grid-image", "placeholder")}
                      />
                    ))}
                  </>
                )}
              </Box>
            </Grid>
          </Grid>

          {/* Bottom Bar */}
          <Box className={cx("footer-bottom")}>
            <Typography variant="body2">
              © {new Date().getFullYear()} {t("footer.brandName") || "FORM"}.{" "}
              {t("footer.copyright") || "Copyright 2022 Codedesign."}
            </Typography>
            <Box className={cx("footer-links")}>
              <Typography variant="body2" className={cx("footer-link")}>
                {t("footer.privacy") || "Privacy"}
              </Typography>
              <Typography variant="body2" className={cx("footer-link")}>
                {t("footer.terms") || "Terms"}
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
