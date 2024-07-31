import React from 'react';
import Input from './Input';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <label className="text-gray-700 font-medium">Search:</label>
      <Input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="input-sm"
        placeholder='Search...'
      />
    </div>
  );
};

export default SearchBar;
