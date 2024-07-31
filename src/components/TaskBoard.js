import React from 'react';
import Column from './Column';
import axios from 'axios';

const TaskBoard = ({ tasks, setTasks }) => {
  const moveTask = (id, column) => {
    const updatedTasks = tasks.map(task => task._id === id ? { ...task, column } : task);
    setTasks(updatedTasks);

    // Update the task column on the backend
    const token = localStorage.getItem('token');
    axios.put(`https://task-manager-backend-8npn.onrender.com/api/tasks/${id}`, { column }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  };

  const columns = ['Todo', 'In Progress', 'Done'];

  return (
    <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
      {columns.map(column => (
        <Column key={column} column={column} tasks={tasks} setTasks={setTasks} moveTask={moveTask} />
      ))}
    </div>
  );
};

export default TaskBoard;
