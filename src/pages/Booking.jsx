import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Booking() {
  const { doctorId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const raw = JSON.parse(localStorage.getItem('pv_doctors_v1') || '{}')
  const doctor = (raw.doctors || []).find(d => d.id === doctorId)
  const date = raw.date
  const [slot, setSlot] = useState('')
  const [error, setError] = useState(null)

  if (!doctor) return <div className="card"><p>Médico no encontrado.</p></div>

  function book() {
    if (!slot) { setError('Seleccione un horario'); return }
    const appts = JSON.parse(localStorage.getItem('pv_appointments_v1') || '[]')
    // check already taken
    if (appts.some(a => a.doctorId === doctorId && a.date === date && a.slot === slot)) {
      setError('Turno ya reservado')
      return
    }
    const id = 'a_' + Date.now()
    const appointment = {
      id,
      date,
      slot,
      doctorId,
      doctorName: doctor.name,
      patientId: user.id,
      patientName: user.name,
      patientEmail: user.email
    }
    appts.push(appointment)
    localStorage.setItem('pv_appointments_v1', JSON.stringify(appts))
    navigate(`/appointment/${id}`)
  }

  // compute available slots for that doctor (exclude taken)
  const taken = JSON.parse(localStorage.getItem('pv_appointments_v1') || '[]')
    .filter(a => a.doctorId === doctorId && a.date === date)
    .map(a => a.slot)
  const available = doctor.slots.filter(s => !taken.includes(s))

  return (
    <div className="card">
      <h2>Reservar con {doctor.name}</h2>
      <div className="muted">Especialidad: {doctor.specialty}</div>
      <div className="muted">Fecha: {date} (solo hora mañana)</div>

      <label>Horarios disponibles</label>
      {available.length === 0 && <p>No hay horarios disponibles.</p>}
      <ul className="slots">
        {available.map(s => (
          <li key={s}>
            <label>
              <input type="radio" name="slot" value={s} checked={slot===s} onChange={()=>setSlot(s)} /> {s}
            </label>
          </li>
        ))}
      </ul>
      {error && <div className="error">{error}</div>}
      <button onClick={book}>Confirmar turno</button>
    </div>
  )
}
