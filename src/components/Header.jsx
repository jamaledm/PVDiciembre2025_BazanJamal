import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Header() {
  const { user, logout } = useAuth()
  const nav = useNavigate()
  function doLogout() {
    logout()
    nav('/login')
  }
  return (
    <header className="header">
      <div className="container">
        <h1 className="brand"><Link to="/">Turnos Médicos</Link></h1>
        <nav>
          {user ? (
            <>
              <span className="muted">{user.name} ({user.role})</span>
              <Link to="/doctors">Doctores</Link>
              <button onClick={doLogout} className="linkish">Salir</button>
            </>
          ) : (
            <>
              <Link to="/login">Ingresar</Link>
              <Link to="/register">Registrarse</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
