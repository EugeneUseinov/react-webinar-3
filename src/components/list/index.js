import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';

function List({list, renderItem, onLoad}) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item._id} className='List-item'>
          {renderItem(item, onLoad)}
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })).isRequired,
  renderItem: PropTypes.func,
  onLoad: PropTypes.func,
};

List.defaultProps = {
  renderItem: (item) => {},
  onLoad: () => {},
}

export default memo(List);
