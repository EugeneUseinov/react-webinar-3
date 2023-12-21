import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import dateParser from "../../utils/date-parser";
import CommentsCreate from "../comments-create";
import CommentsLogin from "../comments-login";
import "./style.css";

function CommentsItem(props) {
  const cn = bem("CommentsItem");
  let padding
  props.item.parent._tree.length > 10 ? padding = null : padding = "repeat"
  const renderComponent = () => {
    if (props.exists && props.item._id === props.commentId) {
      return (
        <CommentsCreate
          padding={padding}
          id={props.item._id}
          onChange={props.onChange}
          onPost={props.onPost}
          commentId={props.commentId}
          onCancel={props.onChangeId}
        />
      );
    } else if (props.item._id === props.commentId) {
      return (
        <CommentsLogin
          padding={padding}
          commentId={props.commentId}
          onCancel={props.onChangeId}
          onLogin={props.onLogin}
        />
      );
    }
  };
  return (
    <div className={cn()}>
      <div className={cn("title")}>
        <div className={cn("author")}>{props.item.author.profile.name}</div>
        <div className={cn("dateCreate")}>
          {dateParser(props.item.dateCreate)}
        </div>
      </div>
      <div className={cn("text")}>{props.item.text}</div>
      <button
        className={cn("button-answer")}
        onClick={() => props.onChangeId(props.item._id)}
      >
        {props.labelAnswer}
      </button>
      {props.item.children.length > 0 ?
        <div
          className={
            props.item.parent._tree.length > 10 ? cn("finallyRepeat") : cn("repeat")
          }
        >
          {props.item.children.map((childComment) => (
            <CommentsItem
              key={childComment._id}
              item={childComment}
              exists={props.exists}
              userId={props.userId}
              commentId={props.commentId}
              onChangeId={props.onChangeId}
              onChange={props.onChange}
              onPost={props.onPost}
              onLogin={props.onLogin}
              labelAnswer={props.labelAnswer}
            />
          ))}
        </div>
       : null}
      {renderComponent()}
    </div>
  );
}

CommentsItem.propTypes = {
  commentId: PropTypes.string,
  exists: PropTypes.bool,
  item: PropTypes.shape({
    author: PropTypes.shape({
      profile: PropTypes.shape({
        name: PropTypes.string,
      }),
      _id: PropTypes.string,
    }),
    dateCreate: PropTypes.string,
    parent: PropTypes.shape({
      _tree: PropTypes.array,
    }),
    text: PropTypes.string,
    _id: PropTypes.string,
    children: PropTypes.array,
  }).isRequired,
  labelAnswer: PropTypes.string,
  userId: PropTypes.string,
  onLogin: PropTypes.func,
  onPost: PropTypes.func,
  onChangeId: PropTypes.func,
  onChange: PropTypes.func,
};

CommentsItem.defaultProps = {
  onLogin: () => {},
  onPost: () => {},
  onChangeId: () => {},
  onChange: () => {},
};

export default memo(CommentsItem);
