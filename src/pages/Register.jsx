import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const { register } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('patient')
  const [specialty, setSpecialty] = useState('')
  const [error, setError] = useState(null)
  const nav = useNavigate()

  function submit(e) {
    e.preventDefault()
    if (role === 'doctor' && !specialty) {
      setError('Los médicos deben indicar una especialidad')
      return
    }
    const res = register({ name, email, password, role, specialty })
    if (res.ok) nav('/')
    else setError(res.message)
  }

  return (
    <div className="card">
      <h2>Registrarse</h2>
      <form onSubmit={submit}>
        <label>Nombre completo</label>
        <input value={name} onChange={e => setName(e.target.value)} required />
        <label>Email</label>
        <input value={email} onChange={e => setEmail(e.target.value)} type="email" required />
        <label>Contraseña</label>
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" required />
        <label>Rol</label>
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="patient">Paciente</option>
          <option value="doctor">Médico</option>
        </select>
        {role === 'doctor' && (
          <>
            <label>Especialidad</label>
            <input value={specialty} onChange={e => setSpecialty(e.target.value)} />
          </>
        )}
        {error && <div className="error">{error}</div>}
        <button type="submit">Crear cuenta</button>
      </form>
    </div>
  )
}
