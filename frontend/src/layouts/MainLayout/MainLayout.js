import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./MainLayout.module.scss";

import Header from "../components/MainHeader";
import Footer from "../components/Footer";

const cx = classNames.bind(styles);

function MainLayout({ children }) {
  return (
    <div className={cx("wrapper")}>
      <Header />
      <div className={cx("container")}>
        <div className={cx("content")}>{children}</div>
      </div>
      <Footer />
    </div>
  );
}

MainLayout.propTyles = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
