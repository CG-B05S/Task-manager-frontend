import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import HomePage from '../../pages/HomePage';
import LoginPage from '../../pages/LoginPage';

jest.mock('axios');
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));

describe('TaskBoard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  async function login() {
    axios.post.mockResolvedValueOnce({ status: 200, data: { token: 'dummy-token' } });

    render(
      <Router>
        <LoginPage />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'rakesh@gmail.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Rakesh@1' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(window.location.pathname).toBe('/home');
    });
  }

  test('views a task successfully', async () => {
    await login();

    axios.get.mockResolvedValueOnce({ data: [{ _id: '123', title: 'New Task', description: 'Task Description', column: 'Todo' }] });

    render(
      <Router>
        <DndProvider backend={HTML5Backend}>
          <HomePage />
        </DndProvider>
      </Router>
    );

    expect(await screen.findByText('New Task')).toBeInTheDocument();
    fireEvent.click(screen.getByText('View Details'));

    expect(await screen.findByText('Task Description')).toBeInTheDocument();
  });


  test('deletes a task successfully', async () => {
    await login();

    axios.get.mockResolvedValueOnce({ data: [{ _id: '123', title: 'New Task', column: 'Todo' }] });
    axios.delete.mockResolvedValueOnce({ status: 200 });

    render(
      <Router>
        <DndProvider backend={HTML5Backend}>
          <HomePage />
        </DndProvider>
      </Router>
    );

    expect(await screen.findByText('New Task')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Delete'));

    await waitFor(() => {
      expect(screen.queryByText('New Task')).not.toBeInTheDocument();
    });
  });

  test('moves a task successfully', async () => {
    await login();

    axios.get.mockResolvedValueOnce({ data: [{ _id: '123', title: 'New Task', column: 'Todo' }] });
    axios.put.mockResolvedValueOnce({ data: { _id: '123', title: 'New Task', column: 'In Progress' } });

    render(
      <Router>
        <DndProvider backend={HTML5Backend}>
          <HomePage />
        </DndProvider>
      </Router>
    );

    expect(await screen.findByText('New Task')).toBeInTheDocument();
    fireEvent.click(screen.getByText('New Task'));
    fireEvent.drag(screen.getByText('New Task'), { target: { column: 'In Progress' } });

    expect(await screen.findByText('New Task')).toBeInTheDocument();
  });
});
