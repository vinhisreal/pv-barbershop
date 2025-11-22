import React from "react";
import { Grid, Typography, Paper, Box } from "@mui/material";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import styles from "./Workbench.module.scss";
import classNames from "classnames/bind";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);
function Workbench() {
  const { t } = useTranslation();
  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
          backgroundColor: "var(--dark-grey)",
        }}
      >
        {/* Navbar */}
        <Navbar />

        <Box
          sx={{ marginLeft: "20px", marginTop: "20px", padding: "0 20px 0 0" }}
        >
          {/* Workbench Content */}
          <Paper>
            <h1 className={cx("title")}>{t("workbench.title")}</h1>
          </Paper>

          <Grid container spacing={3}>
            {/* Stats Section */}
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ padding: "20px" }}>
                <h1>{t("workbench.stats")}</h1>
              </Paper>
            </Grid>

            {/* Recent Properties Section */}
            <Grid item xs={12} md={8}>
              <Paper elevation={3} sx={{ padding: "20px" }}>
                <h1>{t("workbench.recentProperties")}</h1>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default Workbench;
