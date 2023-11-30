import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numFormatter} from '/utils';
import './style.css';

function BasketItem(props) {
  const cn = bem('BasketItem');
  const {code, title, price, count} = props.item
  return (
    <div className={cn()}>
      <div className={cn("code")}>{code}</div>
      <div className={cn("title")}>{title}</div>
      <div className={cn("box")}>
        <div className={cn("price")}>{`${numFormatter(price)} ₽`}</div>
        <div className={cn("count")}>{`${count} шт`}</div>
        <button
          className={cn("delete")}
          onClick={() => props.onDeleteItem(code, price, count)}
        >
          {props.deleteText}
        </button>
      </div>
    </div>
  );
}

BasketItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  }).isRequired,
  onDeleteItem: PropTypes.func,
};

BasketItem.defaultProps = {
  deleteText: 'Удалить',
  onDeleteItem: () => {},
  numFormatter: () => {},
}

export default React.memo(BasketItem);
