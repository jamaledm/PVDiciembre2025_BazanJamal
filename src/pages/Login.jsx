import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate, Link } from 'react-router-dom'

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [fieldsError, setFieldsError] = useState({})
  const nav = useNavigate()

  function validate() {
    const errs = {}
    if (!email) errs.email = 'El email es obligatorio'
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errs.email = 'Email inválido'
    if (!password) errs.password = 'La contraseña es obligatoria'
    else if (password.length < 4) errs.password = 'La contraseña debe tener al menos 4 caracteres'
    setFieldsError(errs)
    return Object.keys(errs).length === 0
  }

  async function submit(e) {
    e.preventDefault()
    setError(null)
    if (!validate()) return
    const res = login(email, password)
    if (res.ok) nav('/')
    else setError(res.message)
  }

  return (
    <div className="card">
      <h2>Ingresar</h2>
      <form onSubmit={submit} noValidate>
        <label>Email</label>
        <input className={fieldsError.email ? 'input-error' : ''} value={email} onChange={e => { setEmail(e.target.value); setFieldsError(f=>({ ...f, email: undefined })) }} />
        {fieldsError.email && <div className="field-error">{fieldsError.email}</div>}

        <label>Contraseña</label>
        <input type="password" className={fieldsError.password ? 'input-error' : ''} value={password} onChange={e => { setPassword(e.target.value); setFieldsError(f=>({ ...f, password: undefined })) }} />
        {fieldsError.password && <div className="field-error">{fieldsError.password}</div>}

        {error && <div className="error">{error}</div>}
        <button type="submit">Ingresar</button>
      </form>
      <p>¿No tienes cuenta? <Link to="/register">Regístrate</Link></p>
    </div>
  )
}
