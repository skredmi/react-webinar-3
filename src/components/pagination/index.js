import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";
import { cn as bem } from "@bem-react/classname";
import { resultPages } from "../../utils";

function Pagination({ page, totalPage, onHandleChangePage }) {
  const cn = bem("Pagination");

  const pages = resultPages(page, totalPage);
  return (
    <div className={cn()}>
      {pages.map((item, index) => (
        <button
          className={
            Number(item) === Number(page) ? cn("itemActive") : cn("item")
          }
          disabled={Number(item) === Number(page) || item === "..."}
          onClick={() => onHandleChangePage(item)}
          key={index}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

Pagination.propTypes = {
  page: PropTypes.number,
  totalPage: PropTypes.number,
  onHandleChangePage: PropTypes.func,
};

Pagination.defaultProps = {
  onHandleChangePage: (item) => {},
};

export default memo(Pagination);
