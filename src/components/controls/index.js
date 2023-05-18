import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { getTotalPrice, plural } from "../../utils";

function Controls({ cart, setIsOpenModal }) {
  const cn = bem("Controls");

  return (
    <div className={cn()}>
      <div className={cn("cart")}>
        В корзине:
        <span className={cn("total")}>
          {cart.length
            ? `${cart.length} ${plural(cart.length, {
                one: "товар",
                few: "товара",
                many: "товаров",
              })} / ${getTotalPrice(cart)} \u20BD`
            : "пусто"}
        </span>
      </div>
      <button
        onClick={() => {
          setIsOpenModal(true);
        }}
      >
        Перейти
      </button>
    </div>
  );
}

Controls.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  setIsOpenModal: PropTypes.func,
};

Controls.defaultProps = {
  setIsOpenModal: () => {},
};

export default React.memo(Controls);
