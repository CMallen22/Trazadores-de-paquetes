import React, { useState } from 'react';
import { ShieldExclamationIcon, LogoutIcon } from '@heroicons/react/outline'; 
import { useRouter } from 'next/navigation';

const Navbar = ({ setSearchQuery }) => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    setSearchQuery(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated'); 
    router.push('/login'); 
  };

  return (
    <nav className="flex justify-between items-center bg-purple-700 p-4">
      <div className="flex items-center">
        <ShieldExclamationIcon className="h-8 w-8 text-white" /> 
        <span className="ml-2 text-white font-bold text-xl">Net-Alert</span> 
      </div>

      <div className="flex-grow flex justify-center">
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="&#x1F50D; Buscar dirección IP..."
          className="w-full max-w-md rounded-md p-2 border-none outline-none text-black"
        />
      </div>

      <div className="flex-grow-0 flex-shrink-0 flex justify-end">
        <LogoutIcon 
          className="h-6 w-6 text-white cursor-pointer"
          onClick={handleLogout} 
        />
      </div>
    </nav>
  );
};

export default Navbar;
