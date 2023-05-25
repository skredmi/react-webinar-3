import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";
import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";

function CardItem({ card, onAdd }) {
  const cn = bem("CardItem");

  console.log(card);
  return (
    <div className={cn()}>
      <div>{card.description}</div>
      <div>
        Страна производитель:{" "}
        <span className={cn("info")}> {card.madeInF}</span>
      </div>
      <div>
        Категория: <span className={cn("info")}>{card.categoryF}</span>
      </div>
      <div>
        Год выпуска: <span className={cn("info")}>{card.edition}</span>
      </div>
      <div className={cn("price")}>
        Цена: <span>{numberFormat(card.price)} ₽</span>
      </div>
      <button className={cn("button")} onClick={() => onAdd(card._id)}>Добавить</button>
    </div>
  );
}

CardItem.propTypes = {};

CardItem.defaultProps = {};

export default memo(CardItem);
