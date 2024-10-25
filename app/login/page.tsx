"use client";

import Image from 'next/image';
import imagen from '@/app/login/imagen.png';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulación de autenticación con admin/admin
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('isAuthenticated', 'true'); // Guarda autenticación en localStorage
      router.push('/'); // Redirige a la página principal
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sección izquierda (Imagen y texto) */}
      <div className="w-1/2 bg-purple-800 text-white flex flex-col items-center justify-center p-5">
        <h1 className="text-4xl mb-5 text-center">Mantén tu red segura</h1>
        
        {/* Imagen PNG debajo del texto */}
        <div className="mb-5">
          <Image 
            src={imagen} 
            alt="Imagen de seguridad"
            width={512}
            height={512}
          />
        </div>
      </div>

      {/* Sección derecha (Formulario de login) */}
      <div className="w-1/2 flex flex-col items-center justify-center">
        <div className="w-4/5 max-w-sm">
          <h2 className="text-3xl mb-5 text-center">Iniciar sesión</h2>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="mb-4">
              <label className="text-base mb-2 block">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 mt-1 mb-2 border border-gray-300 rounded-md text-base"
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="mb-4">
              <label className="text-base mb-2 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 mt-1 mb-2 border border-gray-300 rounded-md text-base"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-purple-800 text-white rounded-md text-base cursor-pointer"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
