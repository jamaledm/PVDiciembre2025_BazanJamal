import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import DoctorList from './pages/DoctorList'
import Booking from './pages/Booking'
import AppointmentDetails from './pages/AppointmentDetails'
import Header from './components/Header'
import { useAuth } from './hooks/useAuth'

function Protected({ children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  useEffect(() => {
    // seed sample data if not present
    const key = 'pv_doctors_v1'
    if (!localStorage.getItem(key)) {
      const today = new Date().toISOString().slice(0, 10)
      const sample = [
        {
          id: 'd1',
          name: 'Dra. Ana Pérez',
          specialty: 'Cardiología',
          slots: ['08:00','08:30','09:00','09:30','10:00']
        },
        {
          id: 'd2',
          name: 'Dr. Luis Gómez',
          specialty: 'Pediatría',
          slots: ['08:00','08:30','09:00','09:30']
        }
      ]
      localStorage.setItem(key, JSON.stringify({ date: today, doctors: sample }))
    }
  }, [])

  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/doctors" element={<Protected><DoctorList /></Protected>} />
          <Route path="/booking/:doctorId" element={<Protected><Booking /></Protected>} />
          <Route path="/appointment/:appointmentId" element={<Protected><AppointmentDetails /></Protected>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}
