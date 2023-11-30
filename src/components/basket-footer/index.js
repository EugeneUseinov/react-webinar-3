import React from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numFormatter} from '/utils';
import './style.css';

function BasketFooter({totalPrice}) {
  const cn = bem('BasketFooter');
  return (
    <div className={cn()}>
      <div className={cn("name")}>Итого</div>
      <div className={cn("price")}>
        {totalPrice ? `${numFormatter(totalPrice)} ₽` : '0 ₽'}
      </div>
    </div>
  );
}

BasketFooter.propTypes = {
  totalPrice: PropTypes.number
};

BasketFooter.defaultProps = {
  numFormatter: () => {},
};

export default React.memo(BasketFooter);
