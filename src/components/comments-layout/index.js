import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';

function CommentsLayout({children}) {
  return (
      <div className='CommentsLayout'>
        {children}
      </div>
  );
}

CommentsLayout.propTypes = {
  children: PropTypes.node
}

export default memo(CommentsLayout);