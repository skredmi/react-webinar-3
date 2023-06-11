import { memo, useState, useEffect } from "react";
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
  level,
  onLogin
}) {
  const cn = bem("ItemComment");


  /*  return (
     <>
       <div className={cn()} style={{ paddingLeft: `${Math.min(30 * level, 600)}px` }}>
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
 
                 {comment.children.length > 0 && comment.children.map((childComment) => (
           <ItemComment
             key={childComment._id}
             comment={childComment}
             currentUser={currentUser}
             onAddComment={onAddComment}
             handleChangeOpenAnswer={handleChangeOpenAnswer}
             level={level}
             exists={exists}
           />
         ))}
 
         {
           isOpenAnswer === comment._id && exists && (
             <CommentTextarea title="ответ" onAddComment={onAddComment}>
               <button onClick={() => handleChangeOpenAnswer()}>Отмена</button>
             </CommentTextarea>
           )
         }
         {
           isOpenAnswer === comment._id && !exists && (
             <div style={{ paddingLeft: `${Math.min(30 * level, 600)}px` }}>
               <div onClick={onLogin} className={cn("login")}>Войдите</div>, чтобы иметь возможность ответить.
               <button
                 className={cn("cancel")}
                 onClick={() => handleChangeOpenAnswer()}
               >
                 Отмена
               </button>
             </div>
           )
         }
       </div>
     </>
 
   );
  */
  return (
    <>
      <div className={cn()} style={{ paddingLeft: `${Math.min(30 * level, 600)}px` }}>
        {isOpenAnswer !== comment._id ? (
          <>
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

          </>
        ) : isOpenAnswer === comment._id && exists ? (
          <CommentTextarea title="ответ" onAddComment={onAddComment} level={level}>
            <button onClick={() => handleChangeOpenAnswer()}>Отмена</button>
          </CommentTextarea>
        ) : (
          <>
            <div style={{ paddingLeft: `${Math.min(30 * level, 30)}px` }}>
              <div onClick={onLogin} className={cn("login")}>Войдите</div>, чтобы иметь возможность ответить.
              <button className={cn("cancel")} onClick={() => handleChangeOpenAnswer()}>
                Отмена
              </button>
            </div>
          </>
        )}
      </div>
    </>
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
