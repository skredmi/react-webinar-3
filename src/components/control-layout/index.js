import { memo } from "react";
import Menu from "../menu";
import PropTypes from "prop-types";
import "./style.css";

function ControlLayout({ children }) {
  return (
    <div className="ControlLayout">
      <Menu title="Главная" />
      {children}
    </div>
  );
}

ControlLayout.propTypes = {
  children: PropTypes.node,
};

export default memo(ControlLayout);
