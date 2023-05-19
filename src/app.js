import React, { useCallback, useState } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from "./components/cart";
import ModalLayout from "./components/modal-layout";
import Item from "./components/item";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { list, cart, cartDetail } = store.getState();

  const callbacks = {
    onAddToCart: useCallback(
      (code) => {
        store.addToCart(code);
      },
      [store]
    ),

    onDeleteCartItem: useCallback(
      (code) => {
        store.deleteCartItem(code);
      },
      [store]
    ),

    productItem: useCallback(
      (item) => (
        <Item
          item={item}
          onClick={callbacks.onAddToCart}
          buttonTitle="Добавить"
        />
      ),
      []
    ),
  };

  return (
    <>
      <PageLayout>
        <Head title="Магазин" />
        <Controls cartDetail={cartDetail} setIsOpenModal={setIsOpenModal} />
        <List list={list} element={callbacks.productItem} />
      </PageLayout>
      <ModalLayout isOpenModal={isOpenModal}>
        <Cart
          cart={cart}
          cartDetail={cartDetail}
          setIsOpenModal={setIsOpenModal}
          onDeleteCartItem={callbacks.onDeleteCartItem}
        />
      </ModalLayout>
    </>
  );
}

export default App;
