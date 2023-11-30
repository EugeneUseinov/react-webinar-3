import React from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numFormatter, plural} from '../../utils';
import './style.css';

function Controls({onOpen, basketCount, totalPrice, goToText}) {
  const cn = bem('Controls');
  return (
    <div className={cn()}>
      <div className={cn('basket')}>В корзине:</div>
      <div className={cn('info')}>
        {basketCount
          ? basketCount +
            ` ${plural(basketCount, {
              one: 'товар',
              few: 'товара',
              many: 'товаров',
            })} / ${numFormatter(totalPrice)} ₽`
          : 'пусто'}
      </div>
      <button className={cn('actions')} onClick={() => onOpen()}>
        {goToText}
      </button>
    </div>
  )
}

Controls.propTypes = {
  onOpen: PropTypes.func,
  totalPrice: PropTypes.number,
  basketCount: PropTypes.number,
};

Controls.defaultProps = {
  goToText: 'Перейти',
  onOpen: () => {},
}

export default React.memo(Controls);
