Sistema de Turnos Médicos (PVDiciembre2025_BazanJamal)

Proyecto SPA con React + Vite para gestionar turnos médicos (condición mínima requerida).

Características implementadas:
- Registro e Ingreso de usuarios (Paciente o Médico)
- Pacientes pueden seleccionar doctor y ver horarios (solo un día — mañana)
- Reserva de turno y visualización del detalle del turno
- Persistencia en `localStorage` (usuarios, doctores, turnos)
- Uso de React hooks, Context API, react-router-dom

Estructura principal:
- `index.html`, `package.json`, `src/` con componentes, pages, contexts y hooks.

Instalación y ejecución (Windows `cmd.exe`):

```
cd "c:\\Users\\jamalelchingon\\programacion visual\\PVDiciembre2025_BazanJamal"
npm install
npm run dev
```

Repositorio GitHub recomendado: `PVDiciembre2025_ApellidoNombre` (sube este proyecto allí para entrega).

Notas:
- El proyecto no envía datos a un servidor; todo está en `localStorage`.
- Para facilitar la consigna, los turnos se muestran para UN SOLO DÍA (la fecha actual) y solo horarios de mañana.

Sugerencias para mejorar:
- Validaciones más avanzadas, PDF de comprobante, estilos con framework (Bootstrap/Tailwind), gestión real con backend.

---
Hecho por el asistente. ¿Querés que haga el commit o que te guíe para subirlo a GitHub ahora?
# PVDiciembre2025_BazanJamal