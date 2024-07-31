import React, { useState } from 'react';
import axios from 'axios';

const AddTaskForm = ({ fetchTasks }) => {
  const [title, setTitle] = useState('');
  const [column, setColumn] = useState('Todo');
  const [error, setError] = useState('');

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://task-manager-backend-8npn.onrender.com/api/tasks', { title, column }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTitle('');
      setColumn('Todo');
      fetchTasks();
    } catch (error) {
      setError('Failed to create task.');
    }
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleCreateTask} className="my-4">
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="input input-bordered w-full input-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Column</label>
          <select value={column} onChange={(e) => setColumn(e.target.value)} className="select select-bordered w-full select-sm">
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Create Task</button>
      </form>
    </div>
  );
};

export default AddTaskForm;
