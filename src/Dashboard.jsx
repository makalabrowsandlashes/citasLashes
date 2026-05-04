import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import SearchBar from './SearchBar.jsx'
import { useNavigate } from "react-router-dom"
import './Dashboard.css'

function Dashboard({ user }) {

  const [citas, setCitas] = useState([])
  const [filtro, setFiltro] = useState('')
  const [citasFiltradas, setCitasFiltradas] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    obtenerCitas()
  }, [])

  async function obtenerCitas() {
    const { data, error } = await supabase
      .from('citaslashes')
      .select('*')
      .order('fecha', { ascending: false })
      .range(0, 30000)

    if (error) {
      console.log(error)
    } else {
      setCitas(data)
      setCitasFiltradas(data)
    }
  }

  const filtroCliente = (query) => {
    const filtradas = citas.filter(cita =>
      cita.nombre_cliente.toLowerCase().includes(query.toLowerCase())
    )
    setCitasFiltradas(filtradas)
  }

  const filtroNumero = (query) => {
    const filtradas = citas.filter(cita =>
      cita.celular.includes(query)
    )
    setCitasFiltradas(filtradas)
  }

  const filtroEspecialista = (query) => {
    const filtradas = citas.filter(cita =>
      cita.especialista.toLowerCase().includes(query.toLowerCase())
    )
    setCitasFiltradas(filtradas)
  }

  // 🔍 Función de búsqueda
  async function handleSearch(query) {
  let columna = ''

  if (filtro === 'cliente') columna = 'nombre_cliente'
  if (filtro === 'numero') columna = 'celular'
  if (filtro === 'especialista') columna = 'especialista'

  const { data, error } = await supabase
    .from('citaslashes')
    .select('*')
    .ilike(columna, `%${query}%`) // 🔥 búsqueda en BD
    .order('fecha', { ascending: false })

  if (error) {
    console.log(error)
  } else {
    setCitasFiltradas(data)
  }
}

async function eliminarCita(id) {
  const confirmacion = confirm("¿Seguro que quieres eliminar esta cita?")

  if (!confirmacion) return

  const { error } = await supabase
    .from('citaslashes')
    .delete()
    .eq('id', id)

  if (error) {
    console.log(error)
  } else {
    const nuevasCitas = citasFiltradas.filter(c => c.id !== id)
    setCitasFiltradas(nuevasCitas)

    const todas = citas.filter(c => c.id !== id)
    setCitas(todas)
  }
}

  return (
    <div className="citas-dashboard">

      <h2>Panel de citas</h2>
      <div className="citas-dashboard-bar">
        <div className="citas-dashboard-search">
          <span>Buscar por</span>
          <select onChange={(e) => setFiltro(e.target.value)}>
            <option value="cliente">CLIENTE</option>
            <option value="numero">NÚMERO</option>
            <option value="especialista">ESPECIALISTA</option>
          </select>
          <SearchBar onSearch={handleSearch} filtro={filtro} />
        </div>

        <button onClick={() => navigate('/nueva-cita')}>
          ➕ Nueva cita
        </button>
      </div>

      <table className="citas-dashboard-table" border="1" cellPadding="10">
        <thead>
          <tr>
            <th className='fecha'>Fecha</th>
            <th>Cliente</th>
            <th>Celular</th>
            <th>Efecto</th>
            <th># Pestañas</th>
            <th>Especialista</th>
            <th>Observaciones</th>
            <th>Acciones</th>
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
              <td>
              <button onClick={() => eliminarCita(cita.id)}>
                ❌ Eliminar
              </button>
            </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Dashboard