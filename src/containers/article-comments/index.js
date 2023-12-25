import { memo, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useInit from '../../hooks/use-init';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import { useSelector as useSelectorRedux } from 'react-redux/es/hooks/useSelector';
import shallowequal from 'shallowequal';
import commentsActions from '../../store-redux/comments/actions';
import listToTree from '../../utils/list-to-tree';
import Spinner from '../../components/spinner';
import CommentsLayout from '../../components/comments-layout';
import CommentsHeader from '../../components/comments-header';
import CommentsLogin from '../../components/comments-login';
import CommentsList from '../../components/comments-list';
import CommentsItem from '../../components/comments-item';
import CommentsCreate from '../../components/comments-create';

function ArticleComments() {

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useInit(async () => {
    dispatch(commentsActions.getComments(params.id));
  }, [params.id]);
  //let hiddenElement = document.getElementById("comment");
  const selectStore = useSelector(state => ({
    exists: state.session.exists,
    userId: state.session.user._id,
    userName: state.session.user.profile?.name,
  }));
  const selectRedux = useSelectorRedux(state => ({
    comments: state.comments.data,
    waiting: state.comments.waiting,
  }), shallowequal);
  const [commentId, setCommentId] = useState('');
  const [text, setText] = useState('');
  const callbacks = {
    getCommentsList: useCallback(() => {
      if (selectRedux.comments.items) {
        return listToTree(selectRedux.comments.items, "article");
      }
    }, [selectRedux.comments]),
    onLogin: useCallback(() => {
      navigate("/login", { state: { back: location.pathname } });
    }, [location.pathname]),
    onPost: useCallback(
      (text, parent) => {
        dispatch(commentsActions.postComments(text, parent));
        setCommentId("");
        setText("");
      },
      [text]
    ),
    onChange: useCallback((value) => {
      setText(value);
    }, []),
    onChangeId: useCallback((value) => {
      setCommentId(value);
    }, []),
  };

  const {t} = useTranslate();

  const renders = {
    getComments: useCallback((item) => (
        <CommentsItem
            item={item}
            exists={selectStore.exists}
            userId={selectStore.userId}
            userName ={selectStore.userName}
            commentId={commentId}
            onLogin={callbacks.onLogin}
            onPost={callbacks.onPost}
            onChange={callbacks.onChange}
            onChangeId={callbacks.onChangeId}
            labelAnswer={t('comments-item.answer')}
        />
    ), [
      selectRedux.comments,
      selectStore.exists,
      commentId,
      callbacks.onLogin,
      callbacks.onPost,
      callbacks.onChange,
      callbacks.onChangeId,
      t
    ]),
  };

  const renderComponent = () => {
    if (!commentId && !selectStore.exists) {
      return <CommentsLogin onLogin={callbacks.onLogin} />;
    } else if (!commentId) {
      return (
        <CommentsCreate
          value={text}
          id={params.id}
          onPost={callbacks.onPost}
          onChange={callbacks.onChange}
        />
      );
    }
  };

  return (
    <CommentsLayout>
      <Spinner active={selectRedux.waiting}>
        <CommentsHeader
          labelTitle={t("comments-header.title")}
          commentsCount={selectRedux.comments.items?.length}
        />
        {selectRedux.comments.items?.length ? (
          <CommentsList
            list={callbacks.getCommentsList()}
            renderComment={renders.getComments}
          />
        ) : null}
        {renderComponent()}
      </Spinner>
    </CommentsLayout>
  );
}

export default memo(ArticleComments);