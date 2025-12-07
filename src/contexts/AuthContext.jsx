import React, { createContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const raw = localStorage.getItem('pv_user_v1')
    if (raw) setUser(JSON.parse(raw))
  }, [])

  function login(email, password) {
    const users = JSON.parse(localStorage.getItem('pv_users_v1') || '[]')
    const u = users.find(x => x.email === email && x.password === password)
    if (u) {
      const { password, ...safe } = u
      setUser(safe)
      localStorage.setItem('pv_user_v1', JSON.stringify(safe))
      return { ok: true }
    }
    return { ok: false, message: 'Credenciales inválidas' }
  }

  function register(payload) {
    const users = JSON.parse(localStorage.getItem('pv_users_v1') || '[]')
    if (users.some(u => u.email === payload.email)) {
      return { ok: false, message: 'El email ya está registrado' }
    }
    const id = 'u_' + Date.now()
    const user = { id, ...payload }
    users.push(user)
    localStorage.setItem('pv_users_v1', JSON.stringify(users))
    const { password, ...safe } = user
    setUser(safe)
    localStorage.setItem('pv_user_v1', JSON.stringify(safe))
    return { ok: true }
  }

  function logout() {
    setUser(null)
    localStorage.removeItem('pv_user_v1')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
