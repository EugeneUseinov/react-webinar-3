import { memo } from "react";
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';

function CommentList({list, renderComment}){

  const cn = bem('CommentList');

  return (
      <div className={cn()}>
        {list.map(comment =>
          <div key={comment._id} className={cn('comment')}>
            {renderComment(comment)}
          </div>
        )}
      </div>
  )
}

CommentList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string})).isRequired,
    renderComment: PropTypes.func,
};

CommentList.defaultProps = {
  renderComment: (comment) => {},
}

export default memo(CommentList);
