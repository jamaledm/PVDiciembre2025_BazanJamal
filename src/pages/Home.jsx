import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Home() {
  const { user } = useAuth()
  return (
    <div className="card">
      <h2>Bienvenido al Sistema de Turnos</h2>
      {user ? (
        <>
          <p>Hola, {user.name} ({user.role})</p>
          {user.role === 'patient' ? (
            <Link to="/doctors"><button>Reservar turno</button></Link>
          ) : (
            <p>Como médico puedes ver tus turnos desde la lista de doctores.</p>
          )}
        </>
      ) : (
        <p>Por favor, <Link to="/login">ingresa</Link> o <Link to="/register">regístrate</Link>.</p>
      )}
    </div>
  )
}
