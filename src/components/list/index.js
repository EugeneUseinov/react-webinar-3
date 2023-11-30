import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function List({list, itemVariant}) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          {itemVariant(item)}
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  itemVariant: PropTypes.func,
};

List.defaultProps = {
  itemVariant: () => {
  },
  list: [],
}

export default React.memo(List);
