import { memo, useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import ItemComment from "../item-comment";
import CommentTextarea from "../comment-textarea";
import { Link } from "react-router-dom";
import transformComments from "../../utils/comments-transform";

function Comments({
  comments,
  exists,
  user,
  isOpenAnswer,
  addComment,
  addAnswer,
  handleChangeOpenAnswer,
}) {
  const cn = bem("Comments");

  const transformedComments = transformComments(comments?.items);

  return (
    <div className={cn()}>
      <div className={cn("title")}>Комментарии ({comments.count})</div>
      {transformedComments?.map((comment) => (
        <ItemComment
          key={comment._id}
          comment={comment}
          exists={exists}
          onAddComment={addAnswer(comment._id)}
          handleChangeOpenAnswer={handleChangeOpenAnswer}
          isOpenAnswer={isOpenAnswer}
          currentUser={user?._id === comment.author?._id}
        />
      ))}
      {exists && !isOpenAnswer && (
        <CommentTextarea title="комментарий" onAddComment={addComment} />
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

Comments.propTypes = {
  comments: PropTypes.shape({
    _id: PropTypes.string,
    text: PropTypes.string,
    dateCreate: PropTypes.string,
    parent: PropTypes.shape({
      _type: PropTypes.string,
      _id: PropTypes.string,
    }),
  }).isRequired,
  exists: PropTypes.bool,
  user: PropTypes.shape({
    id: PropTypes.string,
  }),
  addComment: PropTypes.func,
  addAnswer: PropTypes.func,
  handleChangeOpenAnswer: PropTypes.func,
  isOpenAnswer: PropTypes.string,
};

export default memo(Comments);
