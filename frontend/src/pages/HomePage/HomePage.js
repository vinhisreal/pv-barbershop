import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./HomePage.module.scss";
import PricingTable from "../../components/PricingTable";
import ServiceSlide from "../../components/ServiceSlide";
import LookBook from "../../components/LookBook";
import Review from "../../components/Review";
const cx = classNames.bind(styles);

function HomePage() {
  return (
    <div className={cx("container")}>
      <div className={cx("booking")}>
        <Link to={"/booking"}>
          <div className={cx("booking-btn-container")}>
            <div className={cx("booking-btn")}></div>
          </div>
        </Link>
      </div>
      <section className={cx("service-container")}>
        <section className={cx("service")}>
          <ServiceSlide />
        </section>
      </section>
      <section className={cx("pricing-container")}>
        <section className={cx("pricing")}>
          <PricingTable />
        </section>
        <div className={cx("overflow")}></div>
      </section>
      <section className={cx("lookbook")}>
        <LookBook />
      </section>
      <section className={cx("review")}>
        <Review />
      </section>
    </div>
  );
}

export default HomePage;
