import { memo, useLayoutEffect, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import useTranslate from '../../hooks/use-translate';
import './style.css';

function CommentsLogin({padding, ...props}) {
  const {t} = useTranslate();
  const cn = bem('CommentsLogin');
  const [isNestedLevel, setIsNestedLevel] = useState(props.commentId);
  const handleClick = () => {
    props.onCancel('');
  }
  useLayoutEffect(
    () => setIsNestedLevel(props.commentId), [props.commentId]
  );
  const renderItem = () => {
    if (!isNestedLevel) {
      return (
        <>
          <button className={cn("login")} onClick={props.onLogin}>
          {t("comments-create.login")}
          </button>
          {t("comments-create.loginInfo")}
        </>
      )
    } else {
      return (
        <>
          <button className={cn("login")} onClick={props.onLogin}>
          {t("comments-create.login")}
          </button>
          {t("comments-create.loginInfo")}.
          <button className={cn("cancel")} onClick={handleClick}>
          {t("comments-create.cancel")}
          </button>
        </>
      )
    }
  }

  return (
    <div className={cn({padding})}>
      {renderItem()}
    </div>
  );
}

CommentsLogin.propTypes = {
  commentId: PropTypes.string,
  onCancel: PropTypes.func,
  onLogin: PropTypes.func,
}

CommentsLogin.defaultProps = {
  onCancel: () => {},
  onLogin: () => {},
  commentId: ''
}

export default memo(CommentsLogin);