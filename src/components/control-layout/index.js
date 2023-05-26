import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";

function ControlLayout({ children }) {
  return <div className="ControlLayout">{children}</div>;
}

ControlLayout.propTypes = {
  children: PropTypes.node,
};

export default memo(ControlLayout);
