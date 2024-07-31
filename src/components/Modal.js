import React from 'react';

const Modal = ({ isOpen, onClose, title, children, actions }) => {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h2 className="font-bold text-lg mb-6">{title}</h2>
        <div className="space-y-2">{children}</div>
        <div className="modal-action flex justify-end space-x-2">
          {actions}
          <button className="btn btn-sm btn-ghost" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
