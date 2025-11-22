import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Navbar() {
  const { t } = useTranslation();
  return (
    <AppBar position="sticky" sx={{ backgroundColor: "var(--blue)" }}>
      <Toolbar>
        <Button
          sx={{ marginLeft: "auto" }}
          color="inherit"
          component={Link}
          to="/"
        >
          {t("navbar.home")}
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
