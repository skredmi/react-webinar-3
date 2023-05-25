import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { Link } from "react-router-dom";

function ControlLayout({ children }) {
  const cn = bem("ControlLayout");

  return (
    <div className={cn()}>
      <Link to="/">
        <div className={cn("navigate")}>Главная</div>
      </Link>
      {children}
    </div>
  );
}

ControlLayout.propTypes = {
  children: PropTypes.node,
};

export default memo(ControlLayout);
