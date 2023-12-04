import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numFormatter} from '/utils';
import './style.css';

function Item(props) {
  const cn = bem('Item');
  const {code, title, price} = props.item
  return (
    <div className={cn()}>
      <div className={cn('code')}>{code}</div>
      <div className={cn('title')}>{title}</div>
      <div className={cn('box')}>
      <div className={cn('price')}>{`${numFormatter(price)} ₽`}</div>
      <button className={cn('add')} onClick={() => props.onAddItem(code)}>
        {props.addText}
      </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  }).isRequired,
  onAddItem: PropTypes.func,
};

Item.defaultProps = {
  addText: 'Добавить',
  onAddItem: () => {},
  numFormatter: () => {},
}

export default React.memo(Item);
