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
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";

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


  function transformComments(comments, level = 0) {
    // разделить комментарии на родительские и дочерние
    const parentComments = comments?.filter(
      (comment) => comment.parent._type === "article"
    );
    const childComments = comments?.filter(
      (comment) => comment.parent._type === "comment"
    );
    // добавить дочерние комментарии в свойство children родительских комментариев
    parentComments?.forEach((parentComment) => {
      parentComment.children = childComments.filter(
        (childComment) => childComment.parent._id === parentComment._id
      );
    });
    // преобразовать каждый комментарий в новый объект с нужными свойствами
    return parentComments?.map((comment) => {
      return {
        id: comment._id,
        text: comment.text,
        date: new Date(comment.dateCreate),
        author: comment.author.profile.name,
        parentId: null,
        children: comment.children
          ? comment.children?.map((childComment) => {
              return {
                id: childComment._id,
                text: childComment.text,
                date: new Date(childComment.dateCreate),
                author: childComment.author.profile.name,
                parentId: childComment.parent._id,
                level: level + 1
              };
            })
          : [],
      };
    });
  }


  const newcomments = transformComments(select.comments?.items);
  console.log("newcomments", newcomments);


  return (
    <div className={cn()}>
      <div className={cn("title")}>Комментарии ({select.comments.count})</div>
      {newcomments?.map((comment) => (
        <ItemComment
          key={comment.id}
          comment={comment}
          comments={comment.children}
          exists={exists}
          onAddComment={callbacks.addAnswer(comment.id)}
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
      {!exists && (
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
