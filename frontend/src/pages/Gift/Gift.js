import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findUser, getAllGifts, redeemGift } from "../../redux/apiRequest";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Container,
  Chip,
  Stack,
  IconButton,
  Fade,
  Slide,
} from "@mui/material";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import StarIcon from "@mui/icons-material/Star";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CloseIcon from "@mui/icons-material/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Gift() {
  const [gifts, setGifts] = useState([]);
  const [selectedGift, setSelectedGift] = useState(null);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userInfo = currentUser?.metadata.user;
  const [userPoint, setUserPoint] = useState(0);
  const userId = userInfo?._id;

  const handleGetGifts = async () => {
    const data = await getAllGifts(dispatch);
    setGifts(data || []);
  };

  const handleGetUser = async () => {
    const data = await findUser(userId, dispatch);
    setUserPoint(data.metadata.user.point);
  };

  const { t } = useTranslation();

  const handleConfirmRedeem = async () => {
    if (selectedGift) {
      const data = await redeemGift(
        accessToken,
        {
          user_id: userId,
          gift_id: selectedGift._id,
          user_points: userPoint,
        },
        dispatch
      );
      if (data) {
        toast.success(t("gift.successMessage"), 2000);
        setSelectedGift(null);
        handleGetGifts();
        handleGetUser();
      }
    }
  };

  useEffect(() => {
    handleGetGifts();
    handleGetUser();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        background: "#ffffff",
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        {/* Header Section */}
        <Fade in timeout={800}>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "#f2a515",
                mb: 3,
                boxShadow: "0 4px 20px rgba(242, 165, 21, 0.2)",
              }}
            >
              <CardGiftcardIcon sx={{ fontSize: 40, color: "#000000" }} />
            </Box>
            <Typography
              variant="h2"
              sx={{
                color: "#000000",
                fontWeight: 800,
                mb: 2,
                letterSpacing: "-0.5px",
              }}
            >
              {t("gift.title")}
            </Typography>

            {/* Points Display */}
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 2,
                background: "#ffffff",
                px: 5,
                py: 2.5,
                borderRadius: "50px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                border: "3px solid #f2a515",
              }}
            >
              <StarIcon sx={{ fontSize: 32, color: "#f2a515" }} />
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: "#f2a515",
                }}
              >
                {userPoint.toLocaleString()}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#000000", fontWeight: 600 }}
              >
                {t("gift.currentPoints", { points: "" }).replace(
                  userPoint.toString(),
                  ""
                )}
              </Typography>
            </Box>
          </Box>
        </Fade>

        {/* Gift Cards Grid */}
        <Grid container spacing={4}>
          {gifts.map((gift, index) => (
            <Grid item xs={12} sm={6} md={4} key={gift._id}>
              <Fade in timeout={1000 + index * 100}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                    overflow: "hidden",
                    background: "#ffffff",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    border: "2px solid #f5f5f5",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 12px 40px rgba(242, 165, 21, 0.15)",
                      border: "2px solid #f2a515",
                    },
                  }}
                >
                  <Box sx={{ position: "relative", overflow: "hidden" }}>
                    <CardMedia
                      component="img"
                      height="220"
                      image={
                        gift.image || "https://via.placeholder.com/400x300"
                      }
                      alt={gift.name}
                      sx={{
                        transition: "transform 0.4s ease",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        background: "#f2a515",
                        borderRadius: "20px",
                        px: 2.5,
                        py: 1,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        boxShadow: "0 4px 12px rgba(242, 165, 21, 0.3)",
                      }}
                    >
                      <LocalOfferIcon sx={{ fontSize: 18, color: "#000000" }} />
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 700, color: "#000000" }}
                      >
                        {gift.required_points} pts
                      </Typography>
                    </Box>
                    {gift.quantity < 10 && (
                      <Chip
                        label={`${gift.quantity} ${t("gift.remainingQuantity", {
                          quantity: "",
                        }).replace(gift.quantity.toString(), "")}`}
                        size="small"
                        sx={{
                          position: "absolute",
                          bottom: 16,
                          left: 16,
                          background: "#ff3b4b",
                          color: "#fff",
                          fontWeight: 600,
                        }}
                      />
                    )}
                  </Box>

                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      p: 3,
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      sx={{
                        fontWeight: 700,
                        mb: 1.5,
                        color: "#000000",
                        lineHeight: 1.3,
                      }}
                    >
                      {gift.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: "#637279",
                        mb: 2.5,
                        flexGrow: 1,
                        lineHeight: 1.6,
                      }}
                    >
                      {gift.description}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 2.5,
                        p: 1.5,
                        background: "#fff9e6",
                        borderRadius: 2,
                        border: "1px solid #ffe9a3",
                      }}
                    >
                      <CalendarTodayIcon
                        sx={{ fontSize: 16, color: "#f2a515" }}
                      />
                      <Typography
                        variant="caption"
                        sx={{ color: "#d89412", fontWeight: 600 }}
                      >
                        {new Date(gift.start_date).toLocaleDateString()} -{" "}
                        {new Date(gift.end_date).toLocaleDateString()}
                      </Typography>
                    </Box>

                    <Button
                      variant="contained"
                      fullWidth
                      size="large"
                      onClick={() => setSelectedGift(gift)}
                      disabled={
                        userPoint < gift.required_points || gift.quantity === 0
                      }
                      sx={{
                        background: "#f2a515",
                        color: "#000000",
                        fontWeight: 700,
                        py: 1.5,
                        borderRadius: 2.5,
                        textTransform: "none",
                        fontSize: "1rem",
                        boxShadow: "0 4px 12px rgba(242, 165, 21, 0.3)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          background: "#d89412",
                          boxShadow: "0 6px 20px rgba(242, 165, 21, 0.4)",
                          transform: "translateY(-2px)",
                        },
                        "&:disabled": {
                          background: "#e0e0e0",
                          color: "#999",
                          boxShadow: "none",
                        },
                      }}
                    >
                      {userPoint < gift.required_points
                        ? t("gift.insufficientPoints")
                        : gift.quantity === 0
                        ? t("gift.outOfStock")
                        : t("gift.redeem")}
                    </Button>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>

        {/* Confirmation Dialog */}
        <Dialog
          open={Boolean(selectedGift)}
          onClose={() => setSelectedGift(null)}
          TransitionComponent={Transition}
          PaperProps={{
            sx: {
              borderRadius: 3,
              minWidth: 400,
              background: "#ffffff",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
              border: "2px solid #f2a515",
            },
          }}
        >
          <DialogTitle
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "#f2a515",
              color: "#000000",
              py: 2.5,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <CardGiftcardIcon />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {t("gift.confirmTitle")}
              </Typography>
            </Box>
            <IconButton
              onClick={() => setSelectedGift(null)}
              sx={{
                color: "#000000",
                "&:hover": {
                  background: "rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent sx={{ pt: 4, pb: 3 }}>
            <Typography
              variant="body1"
              sx={{ mb: 3, color: "#000000", lineHeight: 1.6 }}
            >
              {t("gift.confirmMessage", {
                giftName: selectedGift?.name,
                points: selectedGift?.required_points,
              })}
            </Typography>

            <Stack spacing={2}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  p: 2,
                  background: "#fff9e6",
                  borderRadius: 2,
                  border: "1px solid #ffe9a3",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: "#000000" }}
                >
                  {t("gift.currentPoints", { points: "" })}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 700, color: "#f2a515" }}
                >
                  {userPoint.toLocaleString()}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  p: 2,
                  background: "#fff9e6",
                  borderRadius: 2,
                  border: "1px solid #ffe9a3",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: "#000000" }}
                >
                  {t("gift.requiredPoints", { points: "" })}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 700, color: "#f2a515" }}
                >
                  {selectedGift?.required_points.toLocaleString()}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  p: 2,
                  background: "#e6f7f3",
                  borderRadius: 2,
                  border: "2px solid #00684a",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: "#000000" }}
                >
                  {t("gift.remainingAfter")}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 700, color: "#00684a" }}
                >
                  {(
                    userPoint - (selectedGift?.required_points || 0)
                  ).toLocaleString()}
                </Typography>
              </Box>
            </Stack>
          </DialogContent>

          <DialogActions sx={{ p: 3, pt: 0 }}>
            <Button
              onClick={() => setSelectedGift(null)}
              sx={{
                color: "#637279",
                fontWeight: 600,
                px: 3,
                textTransform: "none",
                "&:hover": {
                  background: "#f5f5f5",
                },
              }}
            >
              {t("gift.cancel")}
            </Button>
            <Button
              onClick={handleConfirmRedeem}
              variant="contained"
              sx={{
                background: "#f2a515",
                color: "#000000",
                fontWeight: 700,
                px: 4,
                textTransform: "none",
                boxShadow: "0 4px 12px rgba(242, 165, 21, 0.3)",
                "&:hover": {
                  background: "#d89412",
                  boxShadow: "0 6px 20px rgba(242, 165, 21, 0.4)",
                },
              }}
            >
              {t("gift.confirm")}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}

export default Gift;
