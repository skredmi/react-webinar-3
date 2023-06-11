import { memo, useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import ItemComment from "../item-comment";
import CommentTextarea from "../comment-textarea";
import { useLocation, useNavigate } from "react-router-dom";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";

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
  const navigate = useNavigate()
  const location = useLocation()

  const callbacks = {
    renderComments: useCallback(() => {
      if (comments?.items) {
        return treeToList(listToTree(comments.items, 'article'), (item, level) => {
          return (
            <ItemComment
              key={item._id}
              comment={item}
              level={level}
              exists={exists}
              onAddComment={addAnswer(item._id)}
              handleChangeOpenAnswer={handleChangeOpenAnswer}
              isOpenAnswer={isOpenAnswer}
              currentUser={user?._id === item.author?._id}
              onLogin={callbacks.onLogin}
            />

          );
        });
      }
    }, [comments, isOpenAnswer]),

    onLogin: useCallback(() => {
      navigate('/login', { state: { back: location.pathname } });
    }, [location.pathname]),
  };

  return (
    <div className={cn()}>
      <div className={cn("title")}>Комментарии ({comments.count})</div>
      {callbacks.renderComments()}
      {exists && !isOpenAnswer && (
        <CommentTextarea title="комментарий" onAddComment={addComment}/>
      )}
      {!exists && !isOpenAnswer && (
        <div>
          <div onClick={callbacks.onLogin} className={cn("login")}>Войдите</div>, чтобы иметь возможность
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
};

export default memo(Comments);
