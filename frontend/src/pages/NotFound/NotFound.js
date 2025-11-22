import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function NotFound() {
  const { t } = useTranslation();
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h4" gutterBottom>
        {t("notfound.404")}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {t("notfound.message")}
      </Typography>
      <Button variant="contained" component={Link} to="/" sx={{ mt: 2 }}>
        {t("notfound.goHome")}
      </Button>
    </Container>
  );
}

export default NotFound;
