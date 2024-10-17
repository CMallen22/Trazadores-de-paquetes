import React from 'react';
import { LogoutIcon } from '@heroicons/react/outline';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-purple-700 p-4">
      <div className="flex-grow-0 flex-shrink-0">
        {/* Ícono circular (Placeholder para el logo) */}
        <div className="w-10 h-10 rounded-full bg-white"></div>
      </div>
      
      <div className="flex-grow flex justify-center">
        {/* Input para el buscador */}
        <input type="text" placeholder="&#x1F50D; Buscar..."  className="w-full max-w-md rounded-md p-2 border-none outline-none text-black"/>
      </div>

      <div className="flex-grow-0 flex-shrink-0 flex justify-end">
        {/* Ícono de logout */}
        <LogoutIcon className="h-6 w-6 text-white cursor-pointer" />
      </div>
    </nav>
  );
};

export default Navbar;
