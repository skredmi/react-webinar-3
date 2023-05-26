import { memo } from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Menu() {
  return (
    <div className="Menu">
      <Link to="/" className="Menu-mainLink">
        Главная
      </Link>
    </div>
  );
}

export default memo(Menu);
