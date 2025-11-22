import React from "react";
import { Drawer } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./styles.css";
import { logout } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../createAxios";
import { useTranslation } from "react-i18next";

function Sidebar({ defaultTab = "Dashboard" }) {
  const currentUser = useSelector((state) => state.user.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = currentUser?.metadata.user._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosJWT = createAxios(currentUser);
  const [activeTab, setActiveTab] = useState(defaultTab);
  const handleLogout = async () => {
    await logout(accessToken, userID, dispatch, navigate, axiosJWT);
  };

  const { t } = useTranslation();
  return (
    <>
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
        variant="permanent" // permanent variant removes the overlay effect
        anchor="left"
        BackdropProps={{
          invisible: true, // Prevents the overlay effect
        }}
      >
        <section id="sidebar">
          <Link to={"#"} className="brand">
            <i className="bx bxs-smile"></i>
            <span className="text">{t("slidebar.futureEstate")}</span>
          </Link>
          <ul className="side-menu top">
            <li
              className={activeTab === "Dashboard" ? "active" : ""}
              onClick={() => setActiveTab("Dashboard")}
            >
              <Link to={"/dashboard"}>
                <i className="bx bxs-dashboard"></i>
                <span className="text">{t("slidebar.dashboard")}</span>
              </Link>
            </li>
            <li
              className={activeTab === "Estate" ? "active" : ""}
              onClick={() => setActiveTab("Estate")}
            >
              <Link to={"/dashboard/estate"}>
                <i className="bx bxs-shopping-bag-alt"></i>
                <span className="text">{t("slidebar.estate")}</span>
              </Link>
            </li>
            <li>
              <Link to={"/"}>
                <i className="bx bxs-doughnut-chart"></i>
                <span className="text">{t("slidebar.home")}</span>
              </Link>
            </li>
          </ul>
          <ul className="side-menu">
            <li className={activeTab === "Settings" ? "active" : ""}>
              <Link to={"#"}>
                <i className="bx bxs-cog"></i>
                <span className="text">{t("slidebar.settings")}</span>
              </Link>
            </li>
            <li className={activeTab === "Logout" ? "active" : ""}>
              <Link onClick={handleLogout} className="logout">
                <i className="bx bxs-log-out-circle"></i>
                <span className="text">{t("slidebar.logout")}</span>
              </Link>
            </li>
          </ul>
        </section>
      </Drawer>
    </>
  );
}

export default Sidebar;
