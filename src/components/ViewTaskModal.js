import React from 'react';
import Modal from './Modal';

const ViewTaskModal = ({ task, onClose }) => {
  return (
    <Modal isOpen={true} onClose={onClose} title="Task Details">
      <p><strong>Title: {task.title}</strong></p>
      <p>Description: {task.description}</p>
      <p className="text-sm text-gray-600">Created at: {new Date(task.createdAt).toLocaleString()}</p>
    </Modal>
  );
};

export default ViewTaskModal;
