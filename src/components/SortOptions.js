import React from 'react';

const SortOptions = ({ sortOption, setSortOption }) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <label className="text-gray-700 text-nowrap font-medium">Sort By:</label>
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="select select-sm select-bordered w-full"
      >
        <option value="recent">Recent</option>
        <option value="oldest">Oldest</option>
      </select>
    </div>
  );
};

export default SortOptions;
