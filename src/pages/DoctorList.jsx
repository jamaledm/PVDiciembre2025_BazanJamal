import React from 'react'
import { Link } from 'react-router-dom'

export default function DoctorList() {
  const raw = JSON.parse(localStorage.getItem('pv_doctors_v1') || '{}')
  const doctors = raw.doctors || []
  const date = raw.date || ''

  return (
    <div className="card">
      <h2>Doctores disponibles ({date})</h2>
      {doctors.length === 0 && <p>No hay doctores registrados.</p>}
      <ul className="doctor-list">
        {doctors.map(d => (
          <li key={d.id} className="doctor-item">
            <div>
              <strong>{d.name}</strong>
              <div className="muted">{d.specialty}</div>
            </div>
            <Link to={`/booking/${d.id}`} className="btn">Ver horarios</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
