import {memo, useCallback} from 'react';
import propTypes from 'prop-types';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';
import './style.css';

function ItemBasket(props) {

  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id)
  };

  return (
    <div className={cn()}>
      <Link to={props.path} className={cn("title")} onClick={() => props.onOpen()}>
        <div>{props.item.title}</div>
      </Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {props.countField}</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{props.delete}</button>
        </div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number
  }).isRequired,
  onRemove: propTypes.func,
  onOpen: propTypes.func,
  lang: PropTypes.string,
  path: PropTypes.string,
  countField: PropTypes.string,
  delete: PropTypes.string,
}

ItemBasket.defaultProps = {
  onRemove: () => {},
  onOpen: () => {},
  path: 'item-page/',
}

export default memo(ItemBasket);
