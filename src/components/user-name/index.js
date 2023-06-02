import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { Link } from "react-router-dom";
import "./style.css";

function UserName({ name, link }) {
  const cn = bem("UserName");
  return (
    <Link to={link}>
      <div className={cn()}>{name}</div>
    </Link>
  );
}

UserName.propTypes = {
  name: PropTypes.string,
  link: PropTypes.string,
};

export default memo(UserName);
