import React from 'react';
import Button from './Button';
import Input from './Input';

const TaskForm = ({ handleSubmit, title, setTitle, description, setDescription, column, setColumn, error, setIsModalOpen }) => {
  return (
    <form onSubmit={handleSubmit} className="my-4">
      <div className="mb-4">
        <label className="block text-gray-700">Title</label>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="input-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <Input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Column</label>
        <select
          value={column}
          onChange={(e) => setColumn(e.target.value)}
          className="select select-sm select-bordered w-full"
        >
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="modal-action">
        <Button type="submit" className="btn-sm bg-info text-base-100">
          Create Task
        </Button>
        <Button type="button" className="btn-sm btn-ghost" onClick={() => setIsModalOpen(false)}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
