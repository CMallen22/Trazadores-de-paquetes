// FilterDropdown.js
import React from 'react';
import { FilterIcon, ShieldExclamationIcon } from '@heroicons/react/outline';

const FilterDropdown = ({ options, showDropdown, onFilterClick, handleOptionChange }) => {
  return (
    <div className="relative flex items-center">
      <FilterIcon className="h-6 w-6 ml-2 text-black cursor-pointer" onClick={onFilterClick} />
      {showDropdown && (
        <div className="absolute top-full mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <ul>
            {options.map((option, i) => (
              <li key={i} className={`px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center ${option.color}`}>
                <input
                  type="checkbox"
                  checked={option.checked}
                  onChange={() => handleOptionChange(option.label)}
                  className="mr-2"
                />
                <ShieldExclamationIcon className={`h-6 w-6 mr-2 ${option.iconColor}`} />
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
