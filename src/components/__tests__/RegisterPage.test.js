import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import { toast } from 'react-toastify';
import RegisterPage from '../../pages/RegisterPage';

jest.mock('axios');
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));

describe('RegisterPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly', () => {
    render(
      <Router>
        <RegisterPage />
      </Router>
    );
    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  test('displays error when passwords do not match', async () => {
    render(
      <Router>
        <RegisterPage />
      </Router>
    );
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Password1@' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'Password2@' } });
    fireEvent.click(screen.getByText('Register'));
    await waitFor(() => expect(toast.error).toHaveBeenCalledWith('Passwords do not match'));
  });

  test('displays error when email is already registered', async () => {
    axios.post.mockRejectedValue({ response: { data: { error: 'Email already registered' } } });
    render(
      <Router>
        <RegisterPage />
      </Router>
    );
    fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Password1@' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'Password1@' } });
    fireEvent.click(screen.getByText('Register'));
    await waitFor(() => expect(toast.error).toHaveBeenCalledWith('Email already registered'));
  });

  test('registers successfully with valid data', async () => {
    axios.post.mockResolvedValue({ status: 201 });
    render(
      <Router>
        <RegisterPage />
      </Router>
    );
    fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Password1@' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'Password1@' } });
    fireEvent.click(screen.getByText('Register'));
    await waitFor(() => expect(toast.success).toHaveBeenCalledWith('Registration successful!'));
  });

  test('displays error message on failed registration', async () => {
    axios.post.mockRejectedValue({ response: { data: { error: 'Registration failed' } } });
    render(
      <Router>
        <RegisterPage />
      </Router>
    );
    fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Password1@' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'Password1@' } });
    fireEvent.click(screen.getByText('Register'));
    await waitFor(() => expect(toast.error).toHaveBeenCalledWith('Registration failed'));
  });
});
