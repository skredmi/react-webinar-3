import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function ModalLayout({ isOpenModal, children }) {
  const cn = bem("ModalLayout");

  return (
    <div className={`${cn()} ${isOpenModal && cn("opened")}`}>
      <div className={cn("container")}>{children}</div>
    </div>
  );
}

ModalLayout.propTypes = {
  children: PropTypes.node,
  isOpenModal: PropTypes.bool,
};

export default React.memo(ModalLayout);
