import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  Checkbox,
  Divider,
  Typography,
  Card,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./UpdateBooking.module.scss";
import {
  createAppointment,
  findAllFreeBarber,
  getAllServices,
  getAppointment,
  updateAppointment,
} from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);

const availableTimes = Array.from({ length: 7 }, (_, i) => `${8 + i * 2}:00`);

function UpdateBooking() {
  const { appointmentID } = useParams();
  const currentUser = useSelector((state) => state.user.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = currentUser?.metadata.user._id;
  const dispatch = useDispatch();
  const [allServices, setServices] = useState([]);
  const [endTime, setEndTime] = useState("");
  const [currentBarber, setCurrentBarber] = useState({});
  const [barbers, setBarbers] = useState([]);
  const [formData, setFormData] = useState({
    phone: "",
    name: "",
    guests: 1,
    technician: "",
    services: [],
    date: "",
    time: "",
    note: "",
  });
  const { t } = useTranslation();
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const updatedServices = checked
        ? [...formData.services, value]
        : formData.services.filter((s) => s !== value);

      setFormData((prevData) => ({
        ...prevData,
        services: updatedServices,
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleChangeEndTime = (updatedServices = formData.services) => {
    if (formData.date && formData.time) {
      const fullDateTime = `${formData.date} ${formData.time}`;
      const startMoment = moment(fullDateTime, "YYYY-MM-DD HH:mm");

      const selectedServiceDetails = allServices.filter((s) =>
        updatedServices.includes(s._id)
      );

      // Tính tổng thời gian các dịch vụ
      const totalDuration = selectedServiceDetails.reduce(
        (sum, s) => sum + s.service_duration,
        0
      );

      const calculatedEndTime = startMoment
        .clone()
        .add(totalDuration, "minutes")
        .format("YYYY-MM-DD HH:mm");

      setEndTime(calculatedEndTime);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullDateTime = `${formData.date} ${formData.time}`;

    const appointment = {
      _id: appointmentID,
      customer: currentUser ? userID : null,
      barber: formData.technician === "" ? null : formData.technician,
      services: formData.services,
      appointment_start: fullDateTime,
      customer_name: formData.name,
      phone_number: formData.phone,
      notes: formData.note,
      appointment_end: endTime,
    };
    const data = await updateAppointment(accessToken, appointment, dispatch);
    if (data) {
      toast.success(t("updateBooking.success"));
      setTimeout(() => {
        setFormData({
          phone: "",
          name: "",
          guests: 1,
          technician: "",
          services: [],
          date: "",
          time: "",
          note: "",
        });

        setEndTime("");
        window.location.href =
          process.env.REACT_APP_DASHBOARD_URL + "appointments";
      }, 1000);
    }
  };

  const handleGetService = async () => {
    const data = await getAllServices(dispatch);
    setServices(data.metadata);
  };

  const handleGetBarber = async () => {
    if (formData.date && formData.time && formData.services.length != 0) {
      const fullDateTime = `${formData.date} ${formData.time}`;
      const startMoment = moment(fullDateTime, "YYYY-MM-DD HH:mm");
      const data = await findAllFreeBarber("", startMoment, endTime, dispatch);
      setBarbers(data.metadata);
    } else {
      const data = await findAllFreeBarber("", "", "", dispatch);
      setBarbers(data.metadata);
    }
  };

  const handleGetBooking = async () => {
    const data = await getAppointment(appointmentID, dispatch, false);
    const appointmentStart = moment(data?.metadata.appointment_start);

    const appointmentDate = appointmentStart.format("YYYY-MM-DD");
    const appointmentTime = appointmentStart.format("H:mm");

    setFormData({
      phone: data?.metadata.phone_number,
      name: data?.metadata.customer_name,
      guests: 1,
      technician: data?.metadata.barber._id,
      services: data?.metadata.service.map((s) => s._id),
      date: appointmentDate,
      time: appointmentTime,
      note: data?.metadata.notes,
    });

    setEndTime(data?.metadata.appointment_end);
    setCurrentBarber(data?.metadata.barber);
  };

  useEffect(() => {
    handleGetBooking();
    handleGetService();
    handleGetBarber();
  }, []);

  useEffect(() => {
    handleGetBarber();
  }, [endTime, formData.date, formData.time]);

  useEffect(() => {
    handleChangeEndTime(formData.services);
  }, [formData.date, formData.time, formData.services]);

  return (
    <div className={cx("container")}>
      <h1 className={cx("title")}>{t("updateBooking.title")}</h1>
      <Divider
        sx={{ my: 2, bgcolor: "black", height: 2, width: "800px", mt: 0 }}
      />
      <form onSubmit={handleSubmit} className={cx("form")}>
        <Box mb={2} className={cx("box")}>
          <label className={cx("label")}>{t("updateBooking.phone")}</label>
          <input
            className={cx("input")}
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </Box>
        <Box mb={2} className={cx("box")}>
          <label className={cx("label")}>{t("updateBooking.name")}</label>
          <input
            className={cx("input")}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Box>
        <Box mb={2} className={cx("box")}>
          <label className={cx("label")}>{t("updateBooking.date")}</label>
          <input
            className={cx("input")}
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </Box>
        <Box mb={2} className={cx("box")}>
          <label className={cx("label")}>{t("updateBooking.time")}</label>
          <select
            className={cx("input")}
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          >
            <option value="">{t("updateBooking.selectTime")}</option>
            {availableTimes.map((time, index) => (
              <option key={index} value={time}>
                {time}
              </option>
            ))}
          </select>
        </Box>
        <Box mb={2} className={cx("box")}>
          <label className={cx("label")}>{t("updateBooking.service")}</label>
          {allServices?.map((service, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  name="services"
                  value={service._id}
                  checked={formData.services.includes(service._id)}
                  onChange={handleChange}
                />
              }
              label={t("updateBooking.serviceLabel", {
                name: service.service_name,
                duration: service.service_duration,
                price: service.service_price.toLocaleString(),
              })}
            />
          ))}
        </Box>
        {endTime && (
          <Typography color="primary" fontWeight="bold">
            {t("updateBooking.estimatedEndTime", {
              time: moment(endTime).format("DD-MM-YYYY HH:mm"),
            })}
          </Typography>
        )}
        {currentBarber && (
          <Box sx={{ mt: 2 }}>
            <Card
              key={currentBarber._id}
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                padding: "0px 12px",
                borderRadius: "16px",
                fontSize: "14px",
              }}
            >
              <p style={{ marginRight: "12px" }}>
                {t("updateBooking.currentBarber")}
              </p>
              <img
                src={currentBarber.avatar}
                alt={currentBarber.name}
                width="40"
                height="40"
                style={{ borderRadius: "50%", marginRight: "10px" }}
              />
              <Typography>{currentBarber.name}</Typography>
            </Card>
          </Box>
        )}
        <Box mb={2} className={cx("box")}>
          <label className={cx("label")}>
            {t("updateBooking.requestBarber")}
          </label>
          <select
            className={cx("input")}
            name="technician"
            value={formData.technician}
            onChange={handleChange}
          >
            <option value="">{t("updateBooking.selectBarber")}</option>
            {barbers.map((barber) => (
              <option key={barber._id} value={barber._id}>
                {barber.user_name}
              </option>
            ))}
          </select>
        </Box>
        <Box mb={2} className={cx("box")}>
          <label className={cx("label")}>{t("updateBooking.note")}</label>
          <textarea
            className={cx("input")}
            name="note"
            value={formData.note}
            onChange={handleChange}
          ></textarea>
        </Box>
        <Box mb={2} className={cx("box")} sx={{ textAlign: "center" }}>
          <Button
            type="submit"
            sx={{
              backgroundColor: "var(--yellow)",
              color: "var(--dark)",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "var(--white)",
                color: "var(--black)",
              },
            }}
            fullWidth
            variant="contained"
          >
            {t("updateBooking.bookAppointment")}
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default UpdateBooking;
