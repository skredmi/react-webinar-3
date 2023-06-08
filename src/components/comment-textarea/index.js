import { memo, useRef } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function CommentTextarea({ title, onAddComment, children }) {
  const cn = bem("CommentTextarea");
  const ref = useRef();

  const handleAddComment = () => {
    onAddComment(ref.current.value);
    ref.current.value = "";
  };

  return (
    <div className={cn()}>
      <div className={cn("title")}>Новый {title}</div>
      <textarea
        className={cn("field")}
        placeholder="Текст"
        type="text"
        ref={ref}
      ></textarea>
      <div className={cn("buttons")}>
      <button onClick={handleAddComment}>Отправить</button>
      {children}
      </div>
    </div>
  );
}

CommentTextarea.propTypes = {};

CommentTextarea.defaultProps = {};

export default memo(CommentTextarea);
