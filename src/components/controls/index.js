import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { plural } from "../../utils";

function Controls({ cartDetail, setIsOpenModal }) {
  const cn = bem("Controls");

  return (
    <div className={cn()}>
      <div className={cn("cart")}>
        В корзине:
        <span className={cn("total")}>
          {cartDetail.uniqCount
            ? `${cartDetail.uniqCount} ${plural(cartDetail.uniqCount, {
                one: "товар",
                few: "товара",
                many: "товаров",
              })} / ${cartDetail.totalPrice} \u20BD`
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
  cartDetail: PropTypes.object,
  setIsOpenModal: PropTypes.func,
};

Controls.defaultProps = {
  setIsOpenModal: () => {},
};

export default React.memo(Controls);
