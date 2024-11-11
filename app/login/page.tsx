"use client";

import React, { useState } from 'react';
import { ShieldExclamationIcon } from '@heroicons/react/solid'; 
import { useRouter } from 'next/navigation';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3000/db', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
      console.log('Respuesta de la API:', data); 
  
      if (!response.ok) {
        throw new Error("Error al obtener datos");
      }
      if (data !== '0') {
        localStorage.setItem('isAuthenticated', 'true');
        router.push('/'); 
      } else {
        alert('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      alert('Error al iniciar sesión');
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ 
        width: '50%', 
        backgroundColor: '#5e2d91', 
        color: 'white', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        flexDirection: 'column', 
        padding: '20px' 
      }}>
        <h1 style={{ fontSize: '3em', marginBottom: '20px', textAlign: 'center' }}>Net-Alert</h1>
        <div style={{ marginBottom: '20px' }}>
          <ShieldExclamationIcon 
            className="h-96 w-96 text-white"
          />
        </div>
      </div>

      <div style={{ 
        width: '50%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        flexDirection: 'column'
      }}>
        <div style={{ width: '80%', maxWidth: '300px' }}>
          <h2 style={{ fontSize: '2.5em', marginBottom: '20px', textAlign: 'center' }}>Iniciar sesión</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ fontSize: '1em', marginBottom: '5px', display: 'block' }}>Nombre de usuario</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 10px',
                  marginTop: '5px',
                  marginBottom: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '1em'
                }}
                placeholder="Ingresa tu nombre de usuario"
                required
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ fontSize: '1em', marginBottom: '5px', display: 'block' }}>Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 10px',
                  marginTop: '5px',
                  marginBottom: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '1em'
                }}
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>
            <button
              type="submit"
              style={{ 
                width: '100%', 
                padding: '12px', 
                backgroundColor: '#5e2d91', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                fontSize: '1em',
                cursor: 'pointer'
              }}
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
