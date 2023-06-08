import { memo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import formatDate from "../../utils/formate-date";
import CommentTextarea from "../comment-textarea";
import { Link } from "react-router-dom";

function ItemComment({
  comment,
  comments,
  exists,
  onAddComment,
  handleChangeOpenAnswer,
  isOpenAnswer,
}) {
  const cn = bem("ItemComment");
  const onhandleChangeOpenAnswer = () => {
    if (exists) handleChangeOpenAnswer(comment.id);
  };

  return (
    <div className={cn()}>
      <div className={cn("info")}>
        <div className={cn("user")}>{comment.author}</div>
        <div className={cn("date")}>{formatDate(comment.date)}</div>
      </div>
      <div className={cn("text")}>{comment.text}</div>
      <button className={cn("button")} onClick={onhandleChangeOpenAnswer}>
        Ответить
      </button>
      {comments?.map((childComment) => (
        <div
          key={childComment.id}
          style={{ marginLeft: `${childComment.level * 30}px` }}
        >
          <ItemComment
            comment={childComment}
            exists={exists}
            onAddComment={onAddComment}
            handleChangeOpenAnswer={handleChangeOpenAnswer}
            isOpenAnswer={isOpenAnswer}
          />
        </div>
      ))}
      {isOpenAnswer === comment.id && exists && (
        <CommentTextarea title="ответ" onAddComment={onAddComment}>
          <button onClick={() => handleChangeOpenAnswer(null)}>Отмена</button>
        </CommentTextarea>
      )}{" "}
      {isOpenAnswer === comment.id && !exists && (
        <div>
          <Link to="/login">Войдите</Link>, чтобы иметь возможность ответить
        </div>
      )}
    </div>
  );
}

ItemComment.propTypes = {};

ItemComment.defaultProps = {};

export default memo(ItemComment);
