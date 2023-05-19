import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function List({ list, element }) {
  return (
    <div>
      {list.map((item) => (
        <div key={item.code} className="List-item">
          {element(item)}
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
};

export default React.memo(List);
