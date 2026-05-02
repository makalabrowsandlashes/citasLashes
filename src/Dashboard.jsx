import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import SearchBar from './SearchBar.jsx'

function Dashboard({ user }) {

  const [citas, setCitas] = useState([])
  const [citasFiltradas, setCitasFiltradas] = useState([])

  useEffect(() => {
    obtenerCitas()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  async function obtenerCitas() {
    const { data, error } = await supabase
      .from('citaslashes')
      .select('*')
      .order('fecha', { ascending: false })

    if (error) {
      console.log(error)
    } else {
      setCitas(data)
      setCitasFiltradas(data)
    }
  }

  // 🔍 Función de búsqueda
  function handleSearch(query) {
    const filtradas = citas.filter(cita =>
      cita.nombre_cliente.toLowerCase().includes(query.toLowerCase())
    )
    setCitasFiltradas(filtradas)
  }

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={handleLogout}>
        Cerrar sesión
      </button>

      <h2>Panel de citas</h2>

      {/* 🔍 Buscador */}
      <SearchBar onSearch={handleSearch} />

      <table border="1" cellPadding="10" style={{ width: '100%' }}>
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
          {citasFiltradas.map((cita) => (
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

export default Dashboard