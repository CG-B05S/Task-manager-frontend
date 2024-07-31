import React from 'react';

const Avatar = ({ fullName }) => {
  const generateAvatar = (name) => {
    if (!name) return "NA";
    const nameParts = name.split(' ');
    const initials = nameParts.map(part => part[0]).join('');
    return initials.toUpperCase();
  };

  return (
    <div className="avatar placeholder">
      <div className="bg-neutral text-neutral-content w-8 rounded-full">
        <span>{generateAvatar(fullName)}</span>
      </div>
    </div>
  );
};

export default Avatar;
