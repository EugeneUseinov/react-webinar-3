import { memo, useLayoutEffect, useState, useRef } from 'react';
import { cn as bem } from '@bem-react/classname';
import useTranslate from '../../hooks/use-translate';
import PropTypes from 'prop-types';
import './style.css';

function CommentsCreate({padding, ...props}) {
  const [value, setValue] = useState(props.value);
  const [isNestedLevel] = useState(props.commentId);
  const answerRef = useRef(null)
  const {t} = useTranslate();
  useLayoutEffect(() => {
    setValue(props.value)
    if (answerRef.current !== null) {
    answerRef.current.scrollIntoView({block: 'nearest', behavior: 'smooth'})
    }
  }, [props.value, answerRef]);
  const onHandleChange = (event) => {
    setValue(event.target.value);
    props.onChange(event.target.value);
  };
  const onHandleClick = () => {
    props.onCancel('');
    setValue('');
  }
  const onHandleSubmit = () => {
    if (value && !isNestedLevel) {
      props.onPost(value, { _id: props.id, _type: "article" });
    } else if (value) {
      props.onPost(value, { _id: props.id, _type: "comment" });
    }
  };

  const cn = bem('CommentsCreate');
  return (
    <div ref={isNestedLevel ? answerRef : null} className={cn({padding})}>
      <div className={cn("title")}>
        {isNestedLevel
          ? t("comments-create.answerTitle")
          : t("comments-create.newTitle")}
      </div>
      <textarea
        className={cn("textarea")}
        value={value}
        onChange={onHandleChange}
      />
      <div className={cn("controls")}>
        <button onClick={onHandleSubmit} disabled={!value?.trim()}>
          {t("comments-create.send")}
        </button>
        {isNestedLevel ? (
          <button onClick={onHandleClick}>{t("comments-create.cancel")}</button>
        ) : null}
      </div>
    </div>
  );
}

CommentsCreate.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  onPost: PropTypes.func,
  onChange: PropTypes.func,
}

CommentsCreate.defaultProps = {
  onPost: () => {},
  onChange: () => {},
}

export default memo(CommentsCreate);