import { memo, useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import ItemComment from "../item-comment";
import CommentTextarea from "../comment-textarea";
import { useLocation, useNavigate } from "react-router-dom";

function Comments({
  comments,
  exists,
  user,
  isOpenAnswer,
  addComment,
  addAnswer,
  handleChangeOpenAnswer,
  count,
}) {
  const cn = bem("Comments");
  const navigate = useNavigate();
  const location = useLocation();

  const callbacks = {
    onLogin: useCallback(() => {
      navigate("/login", { state: { back: location.pathname } });
    }, [location.pathname]),
  };

  return (
    <div className={cn()}>
      <div className={cn("title")}>Комментарии ({count})</div>
      {comments.map((i) => (
        <ItemComment
          key={i._id}
          comment={i}
          level={i.level}
          exists={exists}
          onAddComment={addAnswer(i._id)}
          handleChangeOpenAnswer={handleChangeOpenAnswer}
          isOpenAnswer={isOpenAnswer}
          currentUser={user?._id === i.author?._id}
          onLogin={callbacks.onLogin}
        />
      ))}

      {exists && !isOpenAnswer && (
        <CommentTextarea title="комментарий" onAddComment={addComment} />
      )}
      {!exists && !isOpenAnswer && (
        <div className={cn("signin")}>
          <div onClick={callbacks.onLogin} className={cn("login")}>
            Войдите
          </div>
          , чтобы иметь возможность комментировать
        </div>
      )}
    </div>
  );
}

Comments.propTypes = {
  comments: PropTypes.array,
  exists: PropTypes.bool,
  user: PropTypes.shape({
    id: PropTypes.string,
  }),
  addComment: PropTypes.func,
  addAnswer: PropTypes.func,
  handleChangeOpenAnswer: PropTypes.func,
};

export default memo(Comments);
