import React from "react";
import ReactDom from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onCloseModal} />;
};

const ModalOverlays = (props) => {
  return <div className={classes.modal}>{props.children}</div>;
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <React.Fragment>
      {ReactDom.createPortal(
        <Backdrop onCloseModal={props.onCloseModal} />,
        portalElement
      )}
      {ReactDom.createPortal(
        <ModalOverlays>{props.children}</ModalOverlays>,
        portalElement
      )}
    </React.Fragment>
  );
};

export default Modal;
