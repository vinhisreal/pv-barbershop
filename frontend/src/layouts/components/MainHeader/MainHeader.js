import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./MainHeader.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../createAxios";
import { useState, useEffect } from "react";
import {
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
  Badge,
  Popover,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { Notifications, Delete, Check } from "@mui/icons-material";
import {
  logout,
  getNotifications,
  markRead,
  deleteAllNotification,
} from "../../../redux/apiRequest";
import LanguageSwitcher from "../Header/components/LanguageSwitcher";
import socket from "../../../hooks/useSocket";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);
function MainHeader() {
  const currentUser = useSelector((state) => state.user.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = currentUser?.metadata.user._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosJWT = createAxios(currentUser);

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorNotif, setAnchorNotif] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const open = Boolean(anchorEl);
  const openNotif = Boolean(anchorNotif);

  const { t } = useTranslation();

  const handleDeleteAll = async () => {
    await deleteAllNotification(accessToken, userID, dispatch);
    loadNotifications();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotifClick = (event) => {
    setAnchorNotif(event.currentTarget);
  };

  const handleNotifClose = () => {
    setAnchorNotif(null);
  };

  const loadNotifications = async () => {
    const res = await getNotifications(userID, dispatch);
    if (res) {
      setNotifications(res.metadata);
      setUnreadCount(res.metadata.filter((n) => !n.is_read).length);
    }
  };

  const handleMarkRead = async (id) => {
    await markRead(accessToken, id, dispatch);
    loadNotifications();
  };

  const handleDelete = async (id) => {
    alert("Delete", id); // Thêm xóa notification
    loadNotifications();
  };

  const handleLogout = async () => {
    await logout(accessToken, userID, dispatch, navigate, axiosJWT);
  };

  useEffect(() => {
    if (!userID) return;

    socket.emit("join_room", userID);
    loadNotifications();

    socket.on("new_notification", () => {
      loadNotifications();
    });

    return () => socket.off("new_notification");
  }, [userID]);

  return (
    <header className={cx("container")}>
      <div className={cx("wrapper")}>
        <div className={cx("left-nav")}>
          <li>
            <Link to={"/booking"}>{t("navbar.booking")}</Link>
          </li>
          <li>
            <Link to={"/services"}>{t("navbar.service")}</Link>
          </li>
          <li>
            <Link to={"/about"}>{t("navbar.about")}</Link>
          </li>
        </div>
        <div className={cx("logo")}>
          <Link to={"/"}>
            <img
              src="https://res.cloudinary.com/lewisshop/image/upload/v1743512129/toeic/answers/1743512126263-Logo.png.png"
              alt="Logo"
            />
          </Link>
        </div>
        <div className={cx("right-nav")}>
          <li>
            <Link to={"/barbers"}>{t("navbar.barbers")}</Link>
          </li>
          <div style={{ marginLeft: "8px" }}>
            <LanguageSwitcher />
          </div>
          {currentUser ? (
            <div>
              {/* Tooltip and Badge for Notifications */}
              <Tooltip title={t("navbar.notification")}>
                <IconButton sx={{ padding: "24px" }} onClick={handleNotifClick}>
                  <Badge badgeContent={unreadCount} color="error">
                    <Notifications sx={{ color: "var(--white)" }} />
                  </Badge>
                </IconButton>
              </Tooltip>

              {/* Notifications Popover */}
              <Popover
                open={openNotif}
                anchorEl={anchorNotif}
                onClose={handleNotifClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <List sx={{ width: 350, maxHeight: 400, overflowY: "auto" }}>
                  {notifications.length !== 0 && (
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      px={2}
                      py={1}
                    >
                      <Typography variant="h6" fontWeight="bold">
                        {t("navbar.notification")}
                      </Typography>
                      <Button
                        color="error"
                        size="small"
                        onClick={handleDeleteAll}
                        sx={{ textTransform: "none" }}
                      >
                        {t("navbar.deleteAll")}
                      </Button>
                    </Box>
                  )}
                  {notifications.length === 0 ? (
                    <ListItem>
                      <ListItemText
                        style={{ color: "var(--black)" }}
                        primary={t("navbar.noNotification")}
                      />
                    </ListItem>
                  ) : (
                    notifications.map((noti) => (
                      <ListItem
                        key={noti._id}
                        sx={{
                          backgroundColor: noti.is_read ? "#f5f5f5" : "#e3f2fd",
                        }}
                      >
                        <ListItemText
                          primary={
                            <Typography
                              variant="subtitle1"
                              fontWeight="bold"
                              sx={{ color: "var(--black)" }}
                            >
                              {noti.title}
                            </Typography>
                          }
                          secondary={
                            <p
                              style={{
                                textDecoration: "none",
                                textTransform: "none",
                              }}
                            >
                              {noti.message}
                            </p>
                          }
                        />
                        <ListItemSecondaryAction>
                          {!noti.is_read && (
                            <IconButton
                              onClick={() => handleMarkRead(noti._id)}
                            >
                              <Check />
                            </IconButton>
                          )}
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))
                  )}
                </List>
              </Popover>

              {/* Avatar and Profile Menu */}
              <IconButton sx={{ padding: "24px" }} onClick={handleClick}>
                <Avatar
                  src={currentUser?.metadata.user.user_avatar}
                  alt="User Avatar"
                />
              </IconButton>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={handleClose}>
                  <Link
                    to="/gifts"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {t("navbar.giftExchange")}
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link
                    to={`/account/${userID}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {t("navbar.accountInfo")}
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link
                    to={`/history/${userID}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {t("navbar.bookingHistory")}
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link
                    to={`/change-password/${userID}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {t("navbar.changePassword")}
                  </Link>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    handleLogout();
                  }}
                >
                  {t("navbar.logout")}
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <>
              <li>
                <Link to={"/signin"}>{t("navbar.signin")}</Link>
              </li>
              <li>
                <Link to={"/signup"}>{t("navbar.signup")}</Link>
              </li>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default MainHeader;
