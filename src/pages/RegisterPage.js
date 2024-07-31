import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import GoogleLoginButton from '../components/GoogleLoginButton';
import Input from '../components/Input';
import Button from '../components/Button';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return regex.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      toast.error('Passwords do not match');
      return;
    }
    try {
      const res = await axios.post('https://task-manager-backend-8npn.onrender.com/api/auth/register', {
        firstName,
        lastName,
        email,
        password,
      });
      if (res.status === 201) {
        toast.success('Registration successful!');
        navigate('/login');
      }
    } catch (error) {
      setError(error.response.data.error || 'Failed to register. Please try again.');
      toast.error(error.response.data.error || 'Failed to register. Please try again.');
    }
  };
  

  return (
    <div className="max-w-lg mx-auto p-4 sm:p-6 md:p-8 lg:p-10">
      <h2 className="text-2xl font-bold text-info pt-10">Signup</h2>
      <form onSubmit={handleRegister} className="my-4 border-2 rounded-md border-info p-4">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <Input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder="First Name"
          />
        </div>
        <div className="mb-4">
          <Input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder="Last Name"
          />
        </div>
        <div className="mb-4">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
          />
        </div>
        <div className="mb-4 relative">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
            required
            className={`${password && !validatePassword(password) ? 'border-red-500' : ''}`}
            placeholder="Password"
          />
          <div className="absolute right-0 top-0 mt-3 mr-3">
            {password && (
              validatePassword(password) ? (
                <span className="text-green-500">✔️</span>
              ) : (
                <span className="text-red-500">❌</span>
              )
            )}
          </div>
          {isPasswordFocused && (
            <div className="mt-2 p-2 text-sm rounded-md shadow-md bg-gray-100">
              <p>Password must contain:</p>
              <ul className="list-disc list-inside">
                <li className={`${password.length >= 6 ? 'text-green-500' : 'text-red-500'}`}>At least 6 characters</li>
                <li className={`${/(?=.*[A-Z])/.test(password) ? 'text-green-500' : 'text-red-500'}`}>One uppercase letter</li>
                <li className={`${/(?=.*[a-z])/.test(password) ? 'text-green-500' : 'text-red-500'}`}>One lowercase letter</li>
                <li className={`${/(?=.*\d)/.test(password) ? 'text-green-500' : 'text-red-500'}`}>One number</li>
                <li className={`${/(?=.*[@$!%*?&])/.test(password) ? 'text-green-500' : 'text-red-500'}`}>One special character (@, $, !, %, *, ?, &)</li>
              </ul>
            </div>
          )}
        </div>
        <div className="mb-4">
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm Password"
          />
        </div>
        <Button type="submit" className="bg-info w-full text-base-100">Register</Button>
        <div className="flex gap-2 justify-center pt-4 font-normal">
          Already have an account?
          <Link to="/login" className="link link-primary no-underline">
            Login
          </Link>
        </div>
        <GoogleLoginButton action={"Signup"} />
      </form>
    </div>
  );
};

export default RegisterPage;
