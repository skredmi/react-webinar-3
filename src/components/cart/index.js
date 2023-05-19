import React, { useCallback } from "react";
import "./style.css";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import Head from "../head";
import List from "../list";
import Item from "../item";

function Cart({ cart, cartDetail, setIsOpenModal, onDeleteCartItem }) {
  const cn = bem("Cart");

  const callbacks = {
    cartItem: useCallback(
      (item) => (
        <Item item={item} onClick={onDeleteCartItem} buttonTitle="Удалить" />
      ),
      []
    ),
  };

  return (
    <>
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
        <List list={cart} element={callbacks.cartItem} />
      </div>
      <div className={cn("totalPrice")}>
        Итого <span>{cartDetail.totalPrice} &#8381;</span>
      </div>
    </>
  );
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  cartDetail: PropTypes.object,
  setIsOpenModal: PropTypes.func,
  onDeleteCartItem: PropTypes.func,
};

Cart.defaultProps = {
  onDeleteCartItem: () => {},
  setIsOpenModal: () => {},
};

export default React.memo(Cart);
