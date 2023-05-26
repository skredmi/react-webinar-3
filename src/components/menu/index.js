import { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./style.css";

function Menu({ title }) {
  return (
    <Link to="/">
      <div className="Menu">{title}</div>
    </Link>
  );
}

Menu.propTypes = {
  title: PropTypes.string,
};

export default memo(Menu);
