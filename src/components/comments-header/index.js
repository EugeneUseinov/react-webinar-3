import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';

function CommentsHeader(props){
  return (
      <div className='CommentsHeader'>
        {props.labelTitle} ({props.commentsCount})
      </div>
  )
}

CommentsHeader.propTypes = {
  labelTitle: PropTypes.string,
  commentsCount: PropTypes.number,
};

export default memo(CommentsHeader);