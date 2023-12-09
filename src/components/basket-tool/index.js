import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';

function BasketTool(props) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{props.inBasket}:</span>
      <span className={cn('total')}>
        {props.amount
          ? `${props.amount} ${plural(props.amount, {
            one: props.oneProduct,
            few: props.fewProduct,
            many: props.manyProduct,
          })} / ${numberFormat(props.sum)} ₽`
          : props.emptyBasket
        }
      </span>
      <button onClick={props.onOpen}>{props.goTo}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  inBasket: PropTypes.string,
  oneProduct: PropTypes.string,
  fewProduct: PropTypes.string,
  manyProduct: PropTypes.string,
  emptyBasket: PropTypes.string,
  goTo: PropTypes.string,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
}

export default memo(BasketTool);
