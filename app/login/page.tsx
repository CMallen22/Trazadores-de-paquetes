"use client"; 

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
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sección izquierda (Imagen y texto) */}
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
        <h1 style={{ fontSize: '3em', marginBottom: '20px', textAlign: 'center' }}>Mantén tu red segura</h1>
        
        {/* Imagen PNG debajo del texto */}
        <div style={{ marginBottom: '20px' }}>
          <img 
            src="imagen.png" 
            alt="Imagen de seguridad"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      </div>

      {/* Sección derecha (Formulario de login) */}
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
              <label style={{ fontSize: '1em', marginBottom: '5px', display: 'block' }}>Username</label>
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
                placeholder="Enter your username"
                required
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ fontSize: '1em', marginBottom: '5px', display: 'block' }}>Password</label>
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
                placeholder="Enter your password"
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
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
