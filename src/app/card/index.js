import { memo, useCallback, useEffect } from "react";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import CardItem from "../../components/card-item";
import { useParams } from "react-router-dom";
import ControlLayout from "../../components/control-layout";

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
