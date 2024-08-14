import React, { useState } from "react";

interface SearchProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchProps> = ({ value, onChange }) => {
  return (
    <div>
      <input
        type="text"
        value={value}
        placeholder="search events"
        onChange={onChange}
        className="border p-2 rounded-md w-full"
      />
    </div>
  );
};

export default SearchBar;
