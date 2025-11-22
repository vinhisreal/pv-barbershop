import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Empty.module.scss";

const cx = classNames.bind(styles);

function Empty({ children }) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("content")}>{children}</div>
      </div>
    </div>
  );
}

Empty.propTyles = {
  children: PropTypes.node.isRequired,
};

export default Empty;
