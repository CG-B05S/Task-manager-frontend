import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import GoogleLoginButton from '../components/GoogleLoginButton';
import Input from '../components/Input';
import Button from '../components/Button';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://task-manager-backend-8npn.onrender.com/api/auth/login', { email, password });
      if (res.status === 200) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        toast.success('Login successful!');
        navigate('/home');
      }
    } catch (error) {
      setError(error.response.data.error || 'Failed to login. Please check your credentials.');
      toast.error(error.response.data.error || 'Failed to login. Please check your credentials.');
    }
  };
  

  return (
    <div className="max-w-lg mx-auto p-4 sm:p-6 md:p-8 lg:p-10">
      <h2 className="text-2xl font-bold text-info pt-10">Login</h2>
      <form onSubmit={handleLogin} className="my-4 border-2 rounded-md border-info p-4">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
          />
        </div>
        <div className="mb-4">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </div>
        <Button type="submit" className="bg-info text-base-100 w-full">Login</Button>
        <div className="flex gap-2 justify-center pt-4 font-normal">
          Don't have an account?
          <Link to="/register" className="link link-primary no-underline">
            Signup
          </Link>
        </div>
        <GoogleLoginButton action={"Sign in"} />
      </form>
    </div>
  );
};

export default LoginPage;
