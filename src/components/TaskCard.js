import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from './Button';
import EditTaskModal from './EditTaskModal';
import ViewTaskModal from './ViewTaskModal';

const TaskCard = ({ task, setTasks }) => {
  const [, drag] = useDrag({
    type: 'TASK',
    item: { id: task._id }
  });

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);

  const handleEditClick = () => setEditModalOpen(true);
  const handleViewClick = () => setViewModalOpen(true);

  const handleCloseEditModal = () => setEditModalOpen(false);
  const handleCloseViewModal = () => setViewModalOpen(false);

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`https://task-manager-backend-8npn.onrender.com/api/tasks/${task._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTasks(prevTasks => prevTasks.filter(t => t._id !== task._id));
      toast.success('Task deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete task.');
    }
  };

  const handleEditSave = async (updatedTask) => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.put(`https://task-manager-backend-8npn.onrender.com/api/tasks/${task._id}`, updatedTask, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTasks(prevTasks => prevTasks.map(t => t._id === task._id ? res.data : t));
      setEditModalOpen(false);
      toast.success('Task updated successfully!');
    } catch (error) {
      toast.error('Failed to update task.');
    }
  };

  return (
    <div>
      <div ref={drag} className="card bg-blue-100 shadow-md p-4 rounded-lg">
        <h3 className="font-bold">{task.title}</h3>
        <p>{task.description}</p>
        <p className="text-sm text-gray-600 mt-8">Created at: {new Date(task.createdAt).toLocaleString()}</p>
        <div className="flex justify-end gap-2 mt-4">
          <Button className="btn-error btn-sm text-base-100" onClick={handleDelete}>Delete</Button>
          <Button className="btn-primary btn-sm text-base-100 bg-info opacity-80" onClick={handleEditClick}>Edit</Button>
          <Button className="bg-info btn-sm text-base-100" onClick={handleViewClick}>View Details</Button>
        </div>
      </div>

      {isEditModalOpen && (
        <EditTaskModal
          task={task}
          setTasks={setTasks}
          onClose={handleCloseEditModal}
          onSave={handleEditSave}
        />
      )}

      {isViewModalOpen && (
        <ViewTaskModal
          task={task}
          onClose={handleCloseViewModal}
        />
      )}
    </div>
  );
};

export default TaskCard;
