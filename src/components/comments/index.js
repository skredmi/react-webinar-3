import { memo, useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import ItemComment from "../item-comment";
import CommentTextarea from "../comment-textarea";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector as useSelectorRedux } from "react-redux";
import commentsActions from "../../store-redux/comments/actions";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import transformComments from "../../utils/comments-transform";

function Comments() {
  const cn = bem("Comments");
  const dispatch = useDispatch();
  const params = useParams();
  const [isOpenAnswer, setIsOpenAnswer] = useState();

  useInit(() => {
    dispatch(commentsActions.load(params.id));
  }, [params.id]);

  const select = useSelectorRedux((state) => ({
    comments: state.comments.data,
  }));

  const transformedComments = transformComments(select.comments?.items);
  const exists = useSelector((state) => state.session.exists);

  const callbacks = {
    addComment: useCallback((text) => {
      dispatch(commentsActions.add(text, "article", params.id));
    }, []),

    addAnswer: useCallback(
      (parentId) => (text) => {
        dispatch(commentsActions.add(text, "comment", parentId));
      },
      []
    ),
    handleChangeOpenAnswer: useCallback((commentId) => {
      setIsOpenAnswer(commentId);
    }, []),
  };

  return (
    <div className={cn()}>
      <div className={cn("title")}>Комментарии ({select.comments.count})</div>
      {transformedComments?.map((comment) => (
        <ItemComment
          key={comment._id}
          comment={comment}
          exists={exists}
          onAddComment={callbacks.addAnswer(comment._id)}
          handleChangeOpenAnswer={callbacks.handleChangeOpenAnswer}
          isOpenAnswer={isOpenAnswer}
        />
      ))}
      {exists && !isOpenAnswer && (
        <CommentTextarea
          title="комментарий"
          onAddComment={callbacks.addComment}
        />
      )}
      {!exists && !isOpenAnswer && (
        <div>
          <Link to="/login">Войдите</Link>, чтобы иметь возможность
          комментировать
        </div>
      )}
    </div>
  );
}

Comments.propTypes = {};

export default memo(Comments);
