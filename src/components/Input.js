import React from 'react';

const Input = ({ type, value, onChange, placeholder, className, ...props }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`input input-bordered w-full ${className}`}
      {...props}
    />
  );
};

export default Input;
