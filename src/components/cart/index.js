import React from "react";
import "./style.css";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import Head from "../head";
import List from "../list";
import { getTotalPrice } from "../../utils";

function Cart({
  cart,
  isOpenModal,
  setIsOpenModal,
  onDeleteCartItem,
  buttonTitle,
}) {
  const cn = bem("Cart");

  return (
    <div className={`${cn()} ${isOpenModal && cn("opened")}`}>
      <div className={cn("container")}>
        <Head title="Корзина">
          <button
            onClick={() => {
              setIsOpenModal(false);
            }}
          >
            Закрыть
          </button>
        </Head>
        <div className={cn("info")}>
          <List
            list={cart}
            onClick={onDeleteCartItem}
            buttonTitle={buttonTitle}
          />
        </div>
        <div className={cn("totalPrice")}>
          Итого <span>{getTotalPrice(cart)} &#8381;</span>
        </div>
      </div>
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  buttonTitle: PropTypes.string,
  isOpenModal: PropTypes.bool,
  setIsOpenModal: PropTypes.func,
  onDeleteCartItem: PropTypes.func,
};

Cart.defaultProps = {
  onDeleteCartItem: () => {},
  setIsOpenModal: () => {},
};

export default React.memo(Cart);
