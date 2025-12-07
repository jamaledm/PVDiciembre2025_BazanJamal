import React from 'react'
import { useParams, Link } from 'react-router-dom'

export default function AppointmentDetails() {
  const { appointmentId } = useParams()
  const appts = JSON.parse(localStorage.getItem('pv_appointments_v1') || '[]')
  const appt = appts.find(a => a.id === appointmentId)
  if (!appt) return <div className="card"><p>Turno no encontrado.</p></div>

  return (
    <div className="card">
      <h2>Detalle del Turno</h2>
      <p><strong>Fecha:</strong> {appt.date}</p>
      <p><strong>Horario:</strong> {appt.slot}</p>
      <h3>Paciente</h3>
      <p>{appt.patientName} — {appt.patientEmail}</p>
      <h3>Médico</h3>
      <p>{appt.doctorName}</p>

      <p><Link to="/doctors">Volver a doctores</Link></p>
    </div>
  )
}
