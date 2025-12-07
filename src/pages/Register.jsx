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
  const [fieldsError, setFieldsError] = useState({})
  const nav = useNavigate()

  function validate() {
    const errs = {}
    if (!name) errs.name = 'El nombre es obligatorio'
    if (!email) errs.email = 'El email es obligatorio'
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errs.email = 'Email inválido'
    if (!password) errs.password = 'La contraseña es obligatoria'
    else if (password.length < 4) errs.password = 'La contraseña debe tener al menos 4 caracteres'
    if (role === 'doctor' && !specialty) errs.specialty = 'La especialidad es obligatoria para médicos'
    setFieldsError(errs)
    return Object.keys(errs).length === 0
  }

  function submit(e) {
    e.preventDefault()
    setError(null)
    if (!validate()) return
    const res = register({ name, email, password, role, specialty })
    if (res.ok) nav('/')
    else setError(res.message)
  }

  return (
    <div className="card">
      <h2>Registrarse</h2>
      <form onSubmit={submit} noValidate>
        <label>Nombre completo</label>
        <input className={fieldsError.name ? 'input-error' : ''} value={name} onChange={e => { setName(e.target.value); setFieldsError(f=>({ ...f, name: undefined })) }} />
        {fieldsError.name && <div className="field-error">{fieldsError.name}</div>}

        <label>Email</label>
        <input className={fieldsError.email ? 'input-error' : ''} value={email} onChange={e => { setEmail(e.target.value); setFieldsError(f=>({ ...f, email: undefined })) }} type="email" />
        {fieldsError.email && <div className="field-error">{fieldsError.email}</div>}

        <label>Contraseña</label>
        <input className={fieldsError.password ? 'input-error' : ''} value={password} onChange={e => { setPassword(e.target.value); setFieldsError(f=>({ ...f, password: undefined })) }} type="password" />
        {fieldsError.password && <div className="field-error">{fieldsError.password}</div>}

        <label>Rol</label>
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="patient">Paciente</option>
          <option value="doctor">Médico</option>
        </select>

        {role === 'doctor' && (
          <>
            <label>Especialidad</label>
            <input className={fieldsError.specialty ? 'input-error' : ''} value={specialty} onChange={e => { setSpecialty(e.target.value); setFieldsError(f=>({ ...f, specialty: undefined })) }} />
            {fieldsError.specialty && <div className="field-error">{fieldsError.specialty}</div>}
          </>
        )}

        {error && <div className="error">{error}</div>}
        <button type="submit">Crear cuenta</button>
      </form>
    </div>
  )
}
