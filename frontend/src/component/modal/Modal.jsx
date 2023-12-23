import React from "react";

const Modal = ({ title, content, visible, onCancel, onOk }) => {
  if (!visible) {
    return null;
  }

  return (
    <div className="modal-custom p-3 bg-white border rounded-3 shadow">
      <div className="">
        <div className="">
          <h4 className="fw-bold mb-3">{title}</h4>
        </div>
        <div className="mb-3">{content}</div>
        <div className="float-end">
          <button className="btn btn-primary me-3" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-warning" onClick={onOk}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
