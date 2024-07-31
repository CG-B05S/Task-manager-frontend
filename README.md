# Task Manager Application

## Project Description

This Task Manager application is a full-stack project that allows users to manage their tasks efficiently. Users can create, read, update, and delete tasks, as well as authenticate using Google OAuth or register and log in with email and password. The application is built using modern web development technologies and follows best practices for code organization and maintainability.

## Tech Stack

### Frontend
- **React**: JavaScript library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: Promise-based HTTP client for the browser
- **React Router**: Declarative routing for React
- **React DnD**: Drag-and-drop for React
- **Jest**: JavaScript testing framework
- **React Testing Library**: Simple and complete React DOM testing utilities
- **Netlify**: Hosting service for static websites

### Backend
- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine
- **Express**: Web framework for Node.js
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling for Node.js
- **Passport**: Authentication middleware for Node.js
- **JWT**: JSON Web Tokens for authentication
- **Render**: Cloud platform for hosting web applications

## Features
- User authentication with Google OAuth
- User registration and login with email and password
- Error handling for user-friendly messages in the client
- Create, read, update, and delete tasks
- Drag-and-drop task management
- Responsive design

Project Structure
-----------------

### Backend

-   `index.js`: Entry point of the backend server
-   `config/passport.js`: Passport configuration for Google OAuth
-   `controllers/`: Contains authentication and task controllers
-   `middleware/auth.js`: Middleware for authentication
-   `models/`: Contains MongoDB models for User and Task
-   `routes/`: Defines API routes for authentication and tasks

### Frontend

-   `src/`: Contains the source code of the React application
-   `src/components/`: Contains React components
-   `src/pages/`: Contains React pages
-   `src/axiosInstance.js`: Axios instance configuration
-   `src/setupTests.js`: Jest setup file

Error Handling
--------------

The application handles various errors gracefully, providing user-friendly messages to help users understand what went wrong:

-   **Registration Errors**: Handles errors such as invalid email, weak passwords, and existing email accounts.
-   **Login Errors**: Provides feedback for incorrect credentials.
-   **Task Management Errors**: Informs users when task creation, updating, or deletion fails.
-   **Google OAuth Errors**: Manages errors during the OAuth process and informs users accordingly.

Deployment
----------

The application is deployed on:

-   **Frontend**: Netlify
-   **Backend**: Render

## Live Demo
Access the live application: [Task Manager](https://task-manager-cg.netlify.app/home)

## Getting Started

### Prerequisites
- Node.js and npm installed on your local machine
- MongoDB database

### Clone the backend code Repository
```bash
git clone https://github.com/CG-B05S/task-manager-backend.git
cd task-manager-backend
```


### Setup Environment Variables

Create a `.env` file in the root directory of your backend and add the following environment variables:
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SESSION_SECRET=your_session_secret
```

### Install Dependencies

#### Backend

```bash
npm install
node index.js
```
### Clone the Frontend Repository
```bash
git clone https://github.com/CG-B05S/task-manager-backend.git
cd task-manager-backend
```
### Install Dependencies

#### Backend

```bash
npm install
npm start
```
### Running Tests

To run the tests for the frontend application, use the following command:

```bash
npm test
```

Contributing
------------

If you have suggestions or improvements, please feel free to open an issue or create a pull request.
