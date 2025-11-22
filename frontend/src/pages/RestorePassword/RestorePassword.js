import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendOtp, verifyOtp, restorePassword } from "../../redux/apiRequest";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import classNames from "classnames/bind";
import styles from "./RestorePassword.module.scss";
import { createAxios } from "../../createAxios";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);

function RestorePassword() {
  const currentUser = useSelector((state) => state.user.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = currentUser?.metadata.user._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const { t } = useTranslation();
  const handleSendOtp = async () => {
    if (!email.trim()) {
      toast.error(t("restorePassword.emailRequired"));
      return;
    }
    try {
      await sendOtp(email);
      toast.success(t("restorePassword.otpSent"));
      setStep(2);
    } catch (error) {
      toast.error(t("restorePassword.otpFailed"));
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      toast.error(t("restorePassword.otpRequired"));
      return;
    }
    try {
      await verifyOtp(email, otp);
      toast.success(t("restorePassword.otpVerified"));
      setStep(3);
    } catch (error) {
      toast.error(t("restorePassword.otpInvalid"));
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword.trim()) {
      toast.error(t("restorePassword.newPasswordRequired"));
      return;
    }

    try {
      console.log("Reset");
      const data = await restorePassword(
        accessToken,
        userID,
        { email, new_password: newPassword },
        dispatch
      );
      if (data) {
        toast.success(t("restorePassword.resetSuccess"));
        navigate("/signin");
      }
    } catch (error) {
      toast.error(t("restorePassword.resetFailed"));
    }
  };

  return (
    <div className={cx("container")}>
      <div className={cx("form-wrapper")}>
        {step === 1 && (
          <>
            <h2 className={cx("title")}>{t("restorePassword.title")}</h2>
            <Box mb={1}>
              <label style={{ color: "white" }}>
                {t("restorePassword.email")}
              </label>
              <div className={cx("input-wrapper")}>
                <input
                  className={cx("input")}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </Box>
            <Box textAlign="center">
              <Button
                sx={{
                  backgroundColor: "var(--yellow)",
                  color: "var(--dark)",
                  fontWeight: "bold",
                  width: "200px",
                  "&:hover": {
                    backgroundColor: "var(--white)",
                    color: "var(--black)",
                  },
                }}
                variant="contained"
                onClick={handleSendOtp}
              >
                {t("restorePassword.sendOtp")}
              </Button>
            </Box>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className={cx("title")}>Xác thực OTP</h2>
            <Box mb={1}>
              <label style={{ color: "white" }}>OTP</label>
              <div className={cx("input-wrapper")}>
                <input
                  className={cx("input")}
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            </Box>
            <Box textAlign="center">
              <Button
                sx={{
                  backgroundColor: "var(--yellow)",
                  color: "var(--dark)",
                  fontWeight: "bold",
                  width: "200px",
                  "&:hover": {
                    backgroundColor: "var(--white)",
                    color: "var(--black)",
                  },
                }}
                variant="contained"
                onClick={handleVerifyOtp}
              >
                Xác nhận
              </Button>
            </Box>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className={cx("title")}>Đặt mật khẩu mới</h2>
            <Box mb={2}>
              <label style={{ color: "white" }}>Mật khẩu mới</label>
              <div className={cx("input-wrapper")}>
                <input
                  className={cx("input")}
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </Box>
            <Box textAlign="center">
              <Button
                sx={{
                  backgroundColor: "var(--yellow)",
                  color: "var(--dark)",
                  fontWeight: "bold",
                  width: "200px",
                  "&:hover": {
                    backgroundColor: "var(--white)",
                    color: "var(--black)",
                  },
                }}
                variant="contained"
                onClick={handleResetPassword}
              >
                Đổi mật khẩu
              </Button>
            </Box>
          </>
        )}
      </div>
    </div>
  );
}

export default RestorePassword;
