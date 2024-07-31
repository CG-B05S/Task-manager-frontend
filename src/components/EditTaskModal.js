import React, { useState } from 'react';
import Modal from './Modal';
import Input from './Input';
import Button from './Button';

const EditTaskModal = ({ task, setTasks, onClose, onSave }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSave = async () => {
    const updatedTask = { title, description };
    onSave(updatedTask);
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Edit Task"
      actions={
        <>
          <Button className="btn-sm bg-info text-base-100" onClick={handleSave}>
            Save
          </Button>
        </>
      }
    >
      <div className="form-control">
        <label className="label">
          <span className="label-text">Title</span>
        </label>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-sm input-ghost border-0 border-b-2 rounded-none border-base-300"
        />
      </div>
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Description</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea textarea-sm textarea-ghost border-0 border-b-2 rounded-none border-base-300"
        ></textarea>
      </div>
    </Modal>
  );
};

export default EditTaskModal;
