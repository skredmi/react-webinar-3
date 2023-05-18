import React, { useCallback, useState } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { list, cart } = store.getState();

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
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls cart={cart} setIsOpenModal={setIsOpenModal} />
      <List
        list={list}
        onClick={callbacks.onAddToCart}
        buttonTitle={"Добавить"}
      />
      <Cart
        cart={cart}
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        onDeleteCartItem={callbacks.onDeleteCartItem}
        buttonTitle={"Удалить"}
      />
    </PageLayout>
  );
}

export default App;
