import { memo, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import ControlLayout from "../../components/control-layout";
import Menu from "../../components/menu";
import BasketTool from "../../components/basket-tool";
import CardItem from "../../components/card-item";

function Card() {
  const store = useStore();
  const { id } = useParams();

  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    card: state.card.card,
  }));

  useEffect(() => {
    store.actions.modals.close();
    store.actions.card.load(id);
  }, [id]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
  };

  return (
    <PageLayout>
      <Head title={select.card.title} />
      <ControlLayout>
        <Menu />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
      </ControlLayout>
      <CardItem card={select.card} onAdd={callbacks.addToBasket} />
    </PageLayout>
  );
}

export default memo(Card);
