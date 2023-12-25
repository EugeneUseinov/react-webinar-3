import { memo, useLayoutEffect, useState, useRef } from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import useTranslate from '../../hooks/use-translate';
import './style.css';

function CommentsLogin({padding, ...props}) {
  const loginRef = useRef()
  const {t} = useTranslate();
  const cn = bem('CommentsLogin');
  const [isNestedLevel, setIsNestedLevel] = useState(props.commentId);
  const handleClick = () => {
    props.onCancel('');
  }
  useLayoutEffect(
    () => {
      setIsNestedLevel(props.commentId)
      if (loginRef.current !== undefined) {
        loginRef.current.scrollIntoView({block: 'center', behavior: 'smooth'})
      }
    }, [props.commentId, loginRef]
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
        <div ref={loginRef}>
          <button className={cn("login")} onClick={props.onLogin}>
          {t("comments-create.login")}
          </button>
          {t("comments-create.loginInfo")}.
          <button className={cn("cancel")} onClick={handleClick}>
          {t("comments-create.cancel")}
          </button>
        </div>
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