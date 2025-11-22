import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  Checkbox,
  Divider,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Booking.module.scss";
import {
  createAppointment,
  createNotification,
  findAllFreeBarber,
  findReceptionists,
  getAllServices,
} from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);

const availableTimes = Array.from({ length: 7 }, (_, i) => `${8 + i * 2}:00`);

function Booking() {
  const currentUser = useSelector((state) => state.user.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = currentUser?.metadata.user._id;
  const dispatch = useDispatch();
  const [allServices, setServices] = useState([]);
  const [endTime, setEndTime] = useState("");
  const [barbers, setBarbers] = useState([]);
  const [receptionists, setReceptionists] = useState([]);
  const [selectedBarber, setSelectedBarber] = useState(null);
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
    } else if (name === "technician") {
      const barber = barbers.find((b) => b._id === value);
      setSelectedBarber(barber || null);
      setFormData({ ...formData, [name]: value });
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
    const selectedTime = moment(fullDateTime, "YYYY-MM-DD HH:mm");
    const now = moment();

    if (selectedTime.isBefore(now)) {
      toast.error(t("booking.pastTimeError"));
      return;
    }

    const hour = selectedTime.hour();
    if (hour >= 22) {
      toast.error(t("booking.lateHourError"));
      return;
    }

    const endMoment = moment(endTime, "YYYY-MM-DD HH:mm");

    const maxEndTime = moment(`${formData.date} 22:00`, "YYYY-MM-DD HH:mm");

    if (endMoment.isAfter(maxEndTime)) {
      toast.error(t("booking.lateHourError"));
      return;
    }

    const appointment = {
      customer: currentUser ? userID : null,
      barber: formData.technician === "" ? null : formData.technician,
      service: formData.services,
      start: fullDateTime,
      customer_name: formData.name,
      phone_number: formData.phone,
      notes: formData.note,
      end: endTime,
    };
    const data = await createAppointment(appointment, dispatch);

    if (data) {
      for (const r of receptionists) {
        await createNotification(
          accessToken,
          {
            user: r._id,
            title: "New Appointment",
            message: `Customer ${
              formData.name
            } has booked an appointment at ${moment(fullDateTime).format(
              "HH:mm DD/MM/YYYY"
            )}`,
            data: data.metadata,
            is_read: false,
          },
          dispatch
        );
      }

      toast.success(t("booking.successMessage"));

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
    }
  };

  const handleGetService = async () => {
    const data = await getAllServices(dispatch);
    setServices(data.metadata);
  };

  const handleGetBarber = async () => {
    if (formData.date && formData.time && formData.services.length !== 0) {
      const fullDateTime = `${formData.date} ${formData.time}`;
      const startMoment = moment(fullDateTime, "YYYY-MM-DD HH:mm");
      const data = await findAllFreeBarber("", startMoment, endTime, dispatch);
      setBarbers(data.metadata);
    } else {
      const data = await findAllFreeBarber("", "", "", dispatch);
      setBarbers(data.metadata);
    }
  };

  const handleGetReceptionist = async () => {
    const data = await findReceptionists(dispatch);
    console.log("Receptionist", data);
    setReceptionists(data.metadata);
  };

  useEffect(() => {
    handleGetService();
    handleGetBarber();
    handleGetReceptionist();
  }, []);

  useEffect(() => {
    handleGetBarber();
  }, [endTime]);

  useEffect(() => {
    handleChangeEndTime(formData.services);
  }, [formData.date, formData.time, formData.services]);

  return (
    <div className={cx("container")}>
      <h1 className={cx("title")}>{t("booking.title")}</h1>
      <Divider
        sx={{ my: 2, bgcolor: "black", height: 2, width: "800px", mt: 0 }}
      />
      <Typography color="primary" fontWeight="bold">
        {t("booking.mind")}
      </Typography>
      <form onSubmit={handleSubmit} className={cx("form")}>
        <Box mb={2} className={cx("box")}>
          <label className={cx("label")}>{t("booking.phone")}</label>
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
          <label className={cx("label")}>{t("booking.name")}</label>
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
          <label className={cx("label")}>{t("booking.date")}</label>
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
          <label className={cx("label")}>{t("booking.time")}</label>
          <select
            className={cx("input")}
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          >
            <option value="">{t("booking.selectTime")}</option>
            {availableTimes
              .filter((time) => {
                const selectedDate = formData.date;
                if (!selectedDate) return true;

                const fullDateTime = `${selectedDate} ${time}`;
                const momentTime = moment(fullDateTime, "YYYY-MM-DD HH:mm");

                const now = moment();

                return momentTime.isSameOrAfter(now) && momentTime.hour() < 22;
              })
              .map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
          </select>
        </Box>
        <Box mb={2} className={cx("box")}>
          <label className={cx("label")}>{t("booking.service")}</label>
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
              label={`${service.service_name} (${service.service_duration} phút) - Giá: ${service.service_price} VND`}
            />
          ))}
        </Box>
        {endTime && (
          <Typography color="primary" fontWeight="bold">
            {t("booking.estimatedEndTime")}:{" "}
            {moment(endTime).format("DD-MM-YYYY HH:mm")}
          </Typography>
        )}
        <Box mb={2} className={cx("box")}>
          <label className={cx("label")}>{t("booking.technician")}</label>
          <select
            className={cx("input")}
            name="technician"
            value={formData.technician}
            onChange={handleChange}
          >
            <option value="">{t("booking.selectTechnician")}</option>
            {barbers.map((barber) => (
              <option key={barber._id} value={barber._id}>
                {barber.user_name}
              </option>
            ))}
          </select>
          {selectedBarber && (
            <Box mt={3} className={cx("barber-info")}>
              <Typography variant="h6" fontWeight="bold" color="primary">
                Thông tin thợ
              </Typography>
              <Box display="flex" alignItems="center" gap={2} mt={1}>
                <img
                  src={selectedBarber.user_avatar}
                  alt={selectedBarber.user_name}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <Box>
                  <Typography>Tên: {selectedBarber.user_name}</Typography>
                  <Typography>Email: {selectedBarber.user_email}</Typography>
                </Box>
              </Box>

              {selectedBarber.user_highlight_images?.length > 0 && (
                <>
                  <Typography mt={2} fontWeight="bold">
                    Ảnh nổi bật:
                  </Typography>
                  <Box
                    display="grid"
                    gridTemplateColumns="repeat(auto-fill, minmax(120px, 1fr))"
                    gap={1.5}
                    mt={1}
                  >
                    {selectedBarber.user_highlight_images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`highlight-${i}`}
                        style={{
                          width: "100%",
                          height: 120,
                          objectFit: "cover",
                          borderRadius: 8,
                        }}
                      />
                    ))}
                  </Box>
                </>
              )}
            </Box>
          )}
        </Box>
        <Box mb={2} className={cx("box")}>
          <label className={cx("label")}>{t("booking.note")}</label>
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
            {t("booking.submit")}
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default Booking;
