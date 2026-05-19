import React, { useState } from 'react';
import AgregarCine from './AgregarCine';
import AgregarSala from './AgregarSala';

export default function AdminGestion() {
  // Estados para controlar si las ventanas emergentes están abiertas o cerradas
  const [modalCineAbierto, setModalCineAbierto] = useState(false);
  const [modalSalaAbierta, setModalSalaAbierta] = useState(false);

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', backgroundColor: '#fff', minHeight: '100vh' }}>
      <h1 style={{ color: '#1A1A1A', fontSize: '32px', marginBottom: '10px' }}>
        Panel de Administración (Temporal Luis)
      </h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        Usa estos botones para abrir y probar el diseño de tus ventanas emergentes.
      </p>

      {/* Contenedor de botones */}
      <div style={{ display: 'flex', gap: '20px' }}>
        <button 
          onClick={() => setModalCineAbierto(true)}
          style={{ padding: '12px 24px', backgroundColor: '#2D3282', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          + Abrir Agregar Cine
        </button>

        <button 
          onClick={() => setModalSalaAbierta(true)}
          style={{ padding: '12px 24px', backgroundColor: '#2D3282', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          + Abrir Agregar Sala
        </button>
      </div>

      {/* Renderizado Condicional: Si el estado es true, se muestra el modal */}
      {modalCineAbierto && <AgregarCine onClose={() => setModalCineAbierto(false)} />}
      {modalSalaAbierta && <AgregarSala onClose={() => setModalSalaAbierta(false)} />}
    </div>
  );
}