import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getAllServices } from "../../redux/apiRequest";
import classNames from "classnames/bind";
import styles from "./Service.module.scss";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);

function Service() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const handleGetServices = async () => {
    const res = await getAllServices(dispatch);
    if (res && res.metadata) {
      setServices(res.metadata);
    }
  };

  useEffect(() => {
    handleGetServices();
  }, []);

  const totalPages = Math.ceil(services.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = services.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className={cx("container")}>
      <h2 className={cx("title")}>{t("service.title")}</h2>

      {currentItems.map((service) => (
        <div key={service._id} className={cx("service-card")}>
          <div className={cx("avatar")}>
            <img src={service.service_image} alt={service.service_name} />
          </div>
          <div className={cx("info")}>
            <h2>{service.service_name.toUpperCase()}</h2>
            <p>{service.service_description}</p>
            <p>
              <strong>{t("service.duration")}:</strong>{" "}
              {service.service_duration} {t("service.minute")}
            </p>
            <p>
              <strong>{t("service.price")}:</strong>{" "}
              {service.service_price.toLocaleString()} {t("service.vnd")}
            </p>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className={cx("pagination")}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          {t("pagination.previous")}
        </button>

        {/* Hiển thị số trang */}
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
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          {t("pagination.next")}
        </button>
      </div>
    </div>
  );
}

export default Service;
