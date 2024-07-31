import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginPage from '../../pages/LoginPage';

jest.mock('axios');
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));

describe('LoginPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly', () => {
    render(
      <Router>
        <LoginPage />
      </Router>
    );
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('displays error when email is not registered', async () => {
    axios.post.mockRejectedValue({ response: { data: { error: 'Email not registered' } } });
    render(
      <Router>
        <LoginPage />
      </Router>
    );
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'unknown@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Password1@' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(await screen.findByText((content) => content.includes('Email not registered'))).toBeInTheDocument();
  });

  test('displays error when password is incorrect', async () => {
    axios.post.mockRejectedValue({ response: { data: { error: 'Incorrect password' } } });
    render(
      <Router>
        <LoginPage />
      </Router>
    );
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(await screen.findByText((content) => content.includes('Incorrect password'))).toBeInTheDocument();
  });

  test('logs in successfully with valid data', async () => {
        axios.post.mockResolvedValue({ status: 200, data: { token: 'dummy-token' } });
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
      });

});
