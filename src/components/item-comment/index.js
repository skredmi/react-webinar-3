import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import formatDate from "../../utils/formate-date";
import CommentTextarea from "../comment-textarea";

function ItemComment({
  comment,
  exists,
  onAddComment,
  handleChangeOpenAnswer,
  isOpenAnswer,
  currentUser,
  onLogin,
  level
}) {
  const cn = bem("ItemComment");

  return (
    <div className={cn()}>
      <div className={cn("info")}>
        <div className={currentUser ? cn("currentUser") : cn("user")}>
          {comment.author?.profile.name}
        </div>
        <div className={cn("date")}>{formatDate(comment?.dateCreate)}</div>
      </div>
      <div className={cn("text")}>{comment?.text}</div>
      <button
        className={cn("button")}
        onClick={() => handleChangeOpenAnswer(comment._id)}
      >
        Ответить
      </button>
      <div className={comment.level < 15 ? cn("children") : ""}>
        {comment.children.length > 0 &&
          comment.children.map((childComment) => (
            <ItemComment
              key={childComment._id}
              comment={childComment}
              currentUser={currentUser}
              onAddComment={onAddComment}
              handleChangeOpenAnswer={handleChangeOpenAnswer}
              exists={exists}
              isOpenAnswer={isOpenAnswer}
              onLogin={onLogin}
              level={level}
            />
          ))}

        {isOpenAnswer === comment._id && exists && (
          <CommentTextarea title="ответ" onAddComment={onAddComment}>
            <button onClick={() => handleChangeOpenAnswer()}>Отмена</button>
          </CommentTextarea>
        )}
        {isOpenAnswer === comment._id && !exists && (
          <div className={cn("sigin")}>
            <div onClick={onLogin} className={cn("login")}>
              Войдите
            </div>
            , чтобы иметь возможность ответить.
            <button
              className={cn("cancel")}
              onClick={() => handleChangeOpenAnswer()}
            >
              Отмена
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

ItemComment.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string,
    text: PropTypes.string,
    author: PropTypes.shape({
      _id: PropTypes.string,
    }).isRequired,
    dateCreate: PropTypes.string,
    parent: PropTypes.shape({
      _type: PropTypes.string,
      _id: PropTypes.string,
    }).isRequired,
  }).isRequired,
  exists: PropTypes.bool,
  onAddComment: PropTypes.func,
  handleChangeOpenAnswer: PropTypes.func,
  currentUser: PropTypes.bool,
};

export default memo(ItemComment);
