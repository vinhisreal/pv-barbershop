import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import classNames from "classnames/bind";
import Cookies from "js-cookie";
import styles from "./Signup.module.scss";
import { sendOtp, signup, verifyOtp } from "../../redux/apiRequest";
import { Checkbox, FormControlLabel, Modal, TextField } from "@mui/material";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [otp, setOtp] = useState("");
  const [openOtpModal, setOpenOtpModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !email || !password) {
      toast.error(t("signup.fillAllFields"));
      return;
    }

    try {
      await sendOtp(email);
      toast.info(t("signup.otpSent"));
      setOpenOtpModal(true);
    } catch (error) {
      toast.error(t("signup.otpFailed"));
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await verifyOtp(email, otp);

      if (res.metadata.verified) {
        if (rememberMe) {
          Cookies.set("email", email, { expires: 7 });
          Cookies.set("password", password, { expires: 7 });
        }

        const user = { name, email, password };
        const result = await signup(user, dispatch, navigate);

        if (result === false) {
          toast.error(t("signup.signupFailed"));
        } else {
          toast.success(t("signup.signupSuccess"));
        }

        setOpenOtpModal(false);
      } else {
        toast.error(t("signup.invalidOtp"));
      }
    } catch (error) {
      toast.error(t("signup.otpVerificationFailed"));
    }
  };

  return (
    <div className={cx("container")}>
      <div className={cx("content")}>
        <div className={cx("left-part")}>
          <Link to={"/"}>
            <img
              src="https://res.cloudinary.com/lewisshop/image/upload/v1743512129/toeic/answers/1743512126263-Logo.png.png"
              alt="Logo"
            />
          </Link>
        </div>

        <div className={cx("right-part")}>
          <h1 className={cx("title")}>{t("signup.title")}</h1>
          <form onSubmit={handleSubmit} className={cx("form")}>
            <Box mb={1}>
              <label style={{ color: "white" }}>{t("signup.name")}</label>
              <input
                className={cx("input")}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>

            <Box mb={1}>
              <label style={{ color: "white" }}>Email</label>
              <input
                className={cx("input")}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>

            <Box mb={1}>
              <label style={{ color: "white" }}>{t("signup.password")}</label>
              <div className={cx("input-wrapper")}>
                <input
                  className={cx("input")}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className={cx("toggle-password")}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </span>
              </div>
            </Box>

            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    sx={{
                      color: "var(--yellow)",
                      "&.Mui-checked": {
                        color: "var(--yellow)",
                      },
                    }}
                  />
                }
                label={
                  <span style={{ color: "white" }}>
                    {t("signup.rememberMe")}
                  </span>
                }
              />
            </Box>

            <Box sx={{ textAlign: "center" }} mb={2}>
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
                type="submit"
                variant="contained"
              >
                {t("signup.signup")}
              </Button>
            </Box>

            <Box mb={2}>
              {t("signup.alreadyHaveAccount")}
              <Link
                to="/signin"
                style={{
                  color: "var(--yellow)",
                  marginLeft: "12px",
                  fontWeight: "bold",
                }}
              >
                {t("signup.signin")}
              </Link>
            </Box>
          </form>
        </div>
      </div>

      {/* Modal nhập OTP */}
      <Modal
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        open={openOtpModal}
        onClose={() => setOpenOtpModal(false)}
      >
        <Box
          sx={{
            backgroundColor: "var(--white)",
            width: "800px",
            padding: "40px",
            height: "200px",
            outline: "unset",
          }}
          className={cx("otp-modal")}
        >
          <h2>{t("signup.otpVerification")}</h2>
          <TextField
            fullWidth
            label={t("signup.enterOtp")}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <Button
            onClick={handleVerifyOtp}
            variant="contained"
            fullWidth
            sx={{
              marginTop: 2,
              backgroundColor: "var(--yellow)",
              color: "var(--dark)",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "var(--white)",
                color: "var(--black)",
              },
            }}
          >
            {t("signup.confirmOtp")}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default Signup;
