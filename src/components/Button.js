import React from 'react';

const Button = ({ type = 'button', className, children, onClick }) => {
  return (
    <button type={type} className={`btn ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
