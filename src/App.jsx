import { useEffect, useState } from 'react'
import './App.css'
import { supabase } from './supabaseClient'

function App() {
  const [citas, setCitas] = useState([])

  useEffect(() => {
    obtenerCitas()
  }, [])

  async function obtenerCitas() {
    const { data, error } = await supabase
      .from('citaslashes')
      .select('*')
      .order('fecha', { ascending: false })

    if (error) {
      console.log(error)
    } else {
      setCitas(data)
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Listado de Citas</h1>

      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Cliente</th>
            <th>Celular</th>
            <th>Efecto</th>
            <th># Pestañas</th>
            <th>Especialista</th>
            <th>Observaciones</th>
          </tr>
        </thead>

        <tbody>
          {citas.map((cita) => (
            <tr key={cita.id}>
              <td>{cita.fecha}</td>
              <td>{cita.nombre_cliente}</td>
              <td>{cita.celular}</td>
              <td>{cita.efecto_pestanas}</td>
              <td>{cita.numero_pestanas}</td>
              <td>{cita.especialista}</td>
              <td>{cita.observaciones}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


export default App