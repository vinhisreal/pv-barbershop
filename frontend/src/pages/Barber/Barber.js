import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { findAllBarber, getAllReviewsOfBarber } from "../../redux/apiRequest";
import classNames from "classnames/bind";
import styles from "./Barber.module.scss";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"; // Import các icon sao
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);

function Barber() {
  const dispatch = useDispatch();
  const [barbers, setBarbers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const { t } = useTranslation();
  const handleGetBarber = async () => {
    const res = await findAllBarber(dispatch);
    if (res?.metadata) {
      // Gọi review của từng barber và tính rating trung bình
      const updatedBarbers = await Promise.all(
        res.metadata.map(async (barber) => {
          const reviewRes = await getAllReviewsOfBarber(barber._id, dispatch);
          const reviews = reviewRes || [];
          const avgRating =
            reviews.length > 0
              ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
              : 0;

          return {
            ...barber,
            avgRating: Math.round(avgRating * 10) / 10, // làm tròn 1 chữ số thập phân
            reviews: reviews.slice(0, 3), // Lấy 3 review gần đây nhất
          };
        })
      );

      setBarbers(updatedBarbers);
    }
  };

  useEffect(() => {
    handleGetBarber();
  }, []);

  const totalPages = Math.ceil(barbers.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = barbers.slice(startIdx, startIdx + itemsPerPage);

  // Hàm render sao
  const renderStars = (rating) => {
    // Làm tròn sao (làm tròn 0.5 lên hoặc xuống)
    const roundedRating = Math.round(rating * 2) / 2; // Lấy 0.5 sao làm tròn chính xác
    const fullStars = Math.floor(roundedRating); // Tính số sao đầy đủ
    const halfStar = roundedRating % 1 >= 0.5; // Kiểm tra xem có nửa sao không
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Tính số sao trống

    return (
      <>
        {Array(fullStars).fill(<FaStar />)} {/* Sao đầy đủ */}
        {halfStar && <FaStarHalfAlt />} {/* Sao nửa */}
        {Array(emptyStars).fill(<FaRegStar />)} {/* Sao trống */}
      </>
    );
  };

  return (
    <div className={cx("container")}>
      <h1 className={cx("title")}>{t("barber.title")}</h1>

      {currentItems.map((barber) => (
        <div key={barber._id} className={cx("barber-card")}>
          <div className={cx("avatar")}>
            <img src={barber.user_avatar} alt={barber.user_name} />
          </div>
          <div className={cx("info")}>
            <h2>{barber.user_name}</h2>
            <p>Email: {barber.user_email}</p>
            <p>
              {t("barber.gender")}:{" "}
              {barber.user_gender === "male"
                ? t("barber.male")
                : barber.user_gender === "female"
                ? t("barber.female")
                : t("barber.unknown")}
            </p>
            <p>
              {t("barber.phone")}: {barber.user_phone}
            </p>
            <p>
              {t("barber.rating")}: {barber.avgRating} / 5{" "}
              <span className={cx("stars")}>
                {renderStars(barber.avgRating)}
              </span>
            </p>

            {/* Hiển thị 3 review gần đây */}
            <div className={cx("reviews")}>
              <h3>{t("barber.recentReviews")}</h3>
              {barber.reviews.length > 0 ? (
                barber.reviews.map((review) => (
                  <div key={review._id} className={cx("review-item")}>
                    <p>
                      <strong>{review.customer}</strong>: {review.comment}
                    </p>
                    <p>{renderStars(review.rating)}</p>
                  </div>
                ))
              ) : (
                <p>{t("barber.noReviews")}</p>
              )}
            </div>
          </div>
        </div>
      ))}

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

export default Barber;
