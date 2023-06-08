import { memo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import formatDate from "../../utils/formate-date";
import CommentTextarea from "../comment-textarea";
import { Link } from "react-router-dom";

function ItemComment({
  comment,
  exists,
  onAddComment,
  handleChangeOpenAnswer,
  isOpenAnswer,
}) {
  const cn = bem("ItemComment");
  const onhandleChangeOpenAnswer = () => {
    handleChangeOpenAnswer(comment._id);
  };
  const paddingLeft = comment.paddingLeft ? comment.paddingLeft : "0px";
  const textStyles = { paddingLeft: `${paddingLeft}` };
  return (
    <div className={cn()} style={textStyles}>
      <div className={cn("info")}>
        <div className={cn("user")}>{comment.author?.profile.name}</div>
        <div className={cn("date")}>{formatDate(comment?.dateCreate)}</div>
      </div>
      <div className={cn("text")}>{comment?.text}</div>
      <button className={cn("button")} onClick={onhandleChangeOpenAnswer}>
        Ответить
      </button>
      {isOpenAnswer === comment._id && exists && (
        <CommentTextarea title="ответ" onAddComment={onAddComment}>
          <button onClick={() => handleChangeOpenAnswer(null)}>Отмена</button>
        </CommentTextarea>
      )}
      {isOpenAnswer === comment._id && !exists && (
        <div>
          <Link to="/login">Войдите</Link>, чтобы иметь возможность ответить.
          <button
            className={cn("cancel")}
            onClick={() => handleChangeOpenAnswer(null)}
          >
            Отмена
          </button>
        </div>
      )}
    </div>
  );
}

ItemComment.propTypes = {};

ItemComment.defaultProps = {};

export default memo(ItemComment);
