import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAxios } from "../../createAxios";
import { useEffect } from "react";
import { logout } from "../../redux/apiRequest";
import { CircularProgress, Typography, Box } from "@mui/material";

function Logout() {
  const currentUser = useSelector((state) => state.user.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = currentUser?.metadata.user._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosJWT = createAxios(currentUser);

  useEffect(() => {
    logout(accessToken, userID, dispatch, navigate, axiosJWT);
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default",
      }}
    >
      <CircularProgress color="primary" />
      <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
        Đang đăng xuất...
      </Typography>
    </Box>
  );
}

export default Logout;
