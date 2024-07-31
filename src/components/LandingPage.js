import React from 'react';

const LandingPage = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to Task Manager</h1>
        <p className="text-lg mb-6">Manage your tasks efficiently and effortlessly with our task manager application. Keep track of your to-dos, in-progress tasks, and completed tasks in one place.</p>
      </div>
      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-4">Features</h2>
        <ul className="list-disc list-inside text-left mx-auto">
          <li>Drag and drop tasks to manage their status</li>
          <li>Create, edit, and delete tasks with ease</li>
          <li>View task details and keep track of progress</li>
          <li>Responsive design for seamless use on any device</li>
        </ul>
      </div>
      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-4">How It Works</h2>
        <p className="text-lg mb-4">Our task manager application is designed to help you stay organized and productive. Simply create an account, log in, and start managing your tasks. You can easily create new tasks, move them between different columns as their status changes, and edit or delete tasks as needed.</p>
      </div>
      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-4">About Us</h2>
        <p className="text-lg mb-4">We are dedicated to providing you with the best task management experience possible. Our team is constantly working to improve the application and add new features to help you stay organized and productive.</p>
      </div>
    </div>
  );
};

export default LandingPage;
