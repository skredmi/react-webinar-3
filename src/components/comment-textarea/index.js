import { memo, useRef } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function CommentTextarea({ title, onAddComment, children, level }) {
  const cn = bem("CommentTextarea");
  const ref = useRef();

  const handleAddComment = () => {
    if (!ref.current.value.trim().length) return
    onAddComment(ref.current.value);
    ref.current.value = "";
  };

  return (
    <div className={cn()} style={{ paddingLeft: `${Math.min(30 * level, 30)}px` }}>
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

CommentTextarea.propTypes = {
  title: PropTypes.string.isRequired,
  onAddComment: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default memo(CommentTextarea);
