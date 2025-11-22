import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom"; // Để lấy userID từ URL
import { getAllAppointmentsOfUser } from "../../redux/apiRequest";
import classNames from "classnames/bind";
import styles from "./History.module.scss";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);

function History() {
  const dispatch = useDispatch();
  const { userID } = useParams(); // Lấy userID từ URL thông qua useParams
  const [appointments, setAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { t } = useTranslation();
  const handleGetHistory = async () => {
    const res = await getAllAppointmentsOfUser(userID, dispatch); // Sử dụng userID lấy từ URL

    if (res?.metadata && Array.isArray(res.metadata)) {
      // Tạo một bản sao của mảng để tránh thay đổi trực tiếp mảng gốc
      const sorted = [...res.metadata].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      ); // Sắp xếp theo createdAt
      setAppointments(sorted);
    }
  };

  useEffect(() => {
    handleGetHistory();
  }, [userID]); // Khi userID thay đổi sẽ gọi lại API

  const totalPages = Math.ceil(appointments.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = appointments.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className={cx("history-container")}>
      <h2 className={cx("title")}>{t("history.title")}</h2>
      {appointments.length === 0 ? (
        <p className={cx("no-appointments")}>{t("history.noAppointments")}</p>
      ) : (
        <div className={cx("appointment-list")}>
          {currentItems.map((appt) => (
            <div key={appt._id} className={cx("appointment-card")}>
              <div>
                <strong>{t("history.customer")}</strong>: {appt.customer_name}
              </div>
              <div>
                <strong>{t("history.phone")}</strong>: {appt.phone_number}
              </div>
              <div>
                <strong>{t("history.barber")}</strong>:{" "}
                {appt.barber?.user_name || t("history.unknown")}
              </div>
              <div>
                <strong>{t("history.time")}</strong>:{" "}
                {format(new Date(appt.appointment_start), "dd/MM/yyyy HH:mm")} -{" "}
                {format(new Date(appt.appointment_end), "HH:mm")}
              </div>
              <div>
                <strong>{t("history.createdAt")}</strong>:{" "}
                {format(new Date(appt.createdAt), "dd/MM/yyyy HH:mm")}
              </div>{" "}
              {/* Hiển thị ngày tạo */}
              <div>
                <strong>{t("history.status")}</strong>: {appt.status}
              </div>
              <div>
                <strong>{t("history.notes")}</strong>:{" "}
                {appt.notes || t("history.noNotes")}
              </div>
              <div>
                <strong>{t("history.services")}</strong>:
                <ul>
                  {(appt.service || []).map((sv, index) => (
                    <li key={index}>
                      {sv.service_name} - {sv.service_price}đ
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className={cx("pagination")}>
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          {t("pagination.previous")}
        </button>
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx + 1)}
            className={currentPage === idx + 1 ? cx("active") : ""}
          >
            {idx + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          {t("pagination.next")}
        </button>
      </div>
    </div>
  );
}

export default History;
