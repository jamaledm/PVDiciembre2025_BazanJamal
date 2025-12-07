import React from 'react'
import { useParams, Link } from 'react-router-dom'

export default function AppointmentDetails() {
  const { appointmentId } = useParams()
  const appts = JSON.parse(localStorage.getItem('pv_appointments_v1') || '[]')
  const appt = appts.find(a => a.id === appointmentId)
  if (!appt) return <div className="card"><p>Turno no encontrado.</p></div>

  function handlePrint() {
    try {
      const content = `
        <html>
          <head>
            <meta charset="utf-8" />
            <title>Comprobante de Turno</title>
            <style>
              body{font-family:Arial,Helvetica,sans-serif;padding:20px;color:#222}
              .header{background:#0b76ef;color:white;padding:10px;border-radius:6px}
              .card{border:1px solid #ddd;padding:16px;margin-top:12px;border-radius:6px}
              h1{font-size:18px}
              p{margin:6px 0}
              .muted{color:#666}
            </style>
          </head>
          <body>
            <div class="header"><h1>Comprobante de Turno</h1></div>
            <div class="card">
              <p><strong>Fecha:</strong> ${appt.date}</p>
              <p><strong>Horario:</strong> ${appt.slot}</p>
              <h3>Paciente</h3>
              <p>${appt.patientName} — ${appt.patientEmail}</p>
              <h3>Médico</h3>
              <p>${appt.doctorName}</p>
            </div>
          </body>
        </html>
      `
      const w = window.open('', '_blank', 'noopener')
      if (!w) {
        alert('No se pudo abrir la ventana de impresión. Permite popups y vuelve a intentarlo.')
        return
      }
      w.document.open()
      w.document.write(content)
      w.document.close()
      // Esperar a que cargue el contenido antes de imprimir
      w.focus()
      setTimeout(() => {
        w.print()
        // w.close() // opcional: algunos navegadores bloquean cerrar ventanas automáticas
      }, 300)
    } catch (err) {
      console.error(err)
      alert('Error al preparar la impresión')
    }
  }

  return (
    <div className="card">
      <h2>Detalle del Turno</h2>
      <p><strong>Fecha:</strong> {appt.date}</p>
      <p><strong>Horario:</strong> {appt.slot}</p>
      <h3>Paciente</h3>
      <p>{appt.patientName} — {appt.patientEmail}</p>
      <h3>Médico</h3>
      <p>{appt.doctorName}</p>

      <div style={{marginTop:12}}>
        <button onClick={handlePrint}>Imprimir / Guardar como PDF</button>
      </div>

      <p><Link to="/doctors">Volver a doctores</Link></p>
    </div>
  )
}
