import React from 'react';
import { useDrop } from 'react-dnd';
import TaskCard from './TaskCard';

const Column = ({ column, tasks, setTasks, moveTask }) => {
  const [, drop] = useDrop({
    accept: 'TASK',
    drop: (item) => moveTask(item.id, column)
  });

  return (
    <div ref={drop} className="flex-1 bg-base-100 rounded-lg shadow p-4">
      <h2 className="text-lg font-bold bg-info text-base-100 rounded-t-lg p-2 mb-4">{column.toUpperCase()}</h2>
      <div className="space-y-4">
        {tasks.filter(task => task.column === column).map(task => (
          <TaskCard key={task._id} task={task} setTasks={setTasks} />
        ))}
      </div>
    </div>
  );
};

export default Column;
