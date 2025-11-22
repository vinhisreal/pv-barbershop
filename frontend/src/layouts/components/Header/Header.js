import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../createAxios";
import { useEffect, useState } from "react";
import {
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
  Badge,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Typography,
  Popover,
  Box,
} from "@mui/material";
import { Notifications, Delete, Check } from "@mui/icons-material";
import {
  deleteAllNotification,
  getNotifications,
  logout,
  markRead,
} from "../../../redux/apiRequest";
import socket from "../../../hooks/useSocket";
import LanguageSwitcher from "./components/LanguageSwitcher";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);
function Header() {
  const currentUser = useSelector((state) => state.user.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = currentUser?.metadata.user._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosJWT = createAxios(currentUser);
  const { t } = useTranslation();

  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [anchorNotif, setAnchorNotif] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const openNotif = Boolean(anchorNotif);

  const handleNotifClick = (event) => setAnchorNotif(event.currentTarget);
  const handleNotifClose = () => setAnchorNotif(null);

  const handleAvatarClick = (event) => setAnchorEl(event.currentTarget);
  const handleAvatarClose = () => setAnchorEl(null);

  const handleDeleteAll = async () => {
    await deleteAllNotification(accessToken, userID, dispatch);
    loadNotifications();
  };

  const handleLogout = async () => {
    await logout(accessToken, userID, dispatch, navigate, axiosJWT);
  };

  const loadNotifications = async () => {
    const res = await getNotifications(userID, dispatch);
    if (res?.data) {
      setNotifications(res.data);
      setUnreadCount(res.data.filter((n) => !n.isRead).length);
    }
  };

  const handleMarkRead = async (id) => {
    await markRead(id, dispatch);
    loadNotifications();
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

        {currentUser && (
          <>
            <li>
              <Tooltip title={t("navbar.notification")}>
                <IconButton onClick={handleNotifClick}>
                  <Badge badgeContent={unreadCount} color="error">
                    <Notifications sx={{ color: "var(--white)" }} />
                  </Badge>
                </IconButton>
              </Tooltip>
            </li>

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
                          <IconButton onClick={() => handleMarkRead(noti._id)}>
                            <Check />
                          </IconButton>
                        )}
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))
                )}
              </List>
            </Popover>

            <LanguageSwitcher />

            <IconButton sx={{ marginLeft: "20px" }} onClick={handleAvatarClick}>
              <Avatar
                src={currentUser?.metadata.user.user_avatar}
                alt={t("navbar.userAvatar")}
              />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleAvatarClose}
            >
              <MenuItem onClick={handleAvatarClose}>
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to="/gifts"
                >
                  {t("navbar.giftExchange")}
                </Link>
              </MenuItem>
              <MenuItem onClick={handleAvatarClose}>
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to={`/account/${userID}`}
                >
                  {t("navbar.accountInfo")}
                </Link>
              </MenuItem>
              <MenuItem onClick={handleAvatarClose}>
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to={`/history/${userID}`}
                >
                  {t("navbar.bookingHistory")}
                </Link>
              </MenuItem>
              <MenuItem onClick={handleAvatarClose}>
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to={`/change-password/${userID}`}
                >
                  {t("navbar.changePassword")}
                </Link>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleAvatarClose();
                  handleLogout();
                }}
              >
                {t("navbar.logout")}
              </MenuItem>
            </Menu>
          </>
        )}

        {!currentUser && (
          <>
            <div style={{ marginLeft: "8px" }}>
              <LanguageSwitcher />
            </div>

            <li>
              <Tooltip title={t("navbar.account")}>
                <IconButton
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  sx={{ color: "white" }}
                >
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: "white",
                      border: "1px solid white",
                    }}
                  >
                    <Typography variant="body2">👤</Typography>
                  </Avatar>
                </IconButton>
              </Tooltip>

              <Menu
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleAvatarClose}
                PaperProps={{
                  sx: {
                    mt: 1,
                    minWidth: 150,
                  },
                }}
              >
                <MenuItem onClick={handleAvatarClose}>
                  <Link
                    to="/signin"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {t("navbar.signin")}
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleAvatarClose}>
                  <Link
                    to="/signup"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {t("navbar.signup")}
                  </Link>
                </MenuItem>
              </Menu>
            </li>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
