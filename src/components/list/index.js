import React from "react";
import PropTypes from "prop-types";
import Item from "../item";
import "./style.css";

function List({ list, onClick, buttonTitle }) {
  return (
    <div>
      {list.map((item) => (
        <div key={item.code} className="List-item">
          <Item item={item} onClick={onClick} buttonTitle={buttonTitle} />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  onClick: PropTypes.func,
  buttonTitle: PropTypes.string,
};

List.defaultProps = {
  onClick: () => {},
};

export default React.memo(List);
