  import React from "react";
  import Button from './Button';

  const GoogleLoginButton = ({ action }) => {
    const handleGoogleLogin = () => {
      window.location.href = "https://task-manager-backend-8npn.onrender.com/api/auth/google";
    };

    return (
      <div className="flex justify-center">
        <Button onClick={handleGoogleLogin} className="bg-info text-base-100 mt-4">
          {action} with Google
        </Button>
      </div>
    );
  };

  export default GoogleLoginButton;
