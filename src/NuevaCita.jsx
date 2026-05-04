import { useState } from "react"
import { supabase } from "./supabaseClient"
import { useNavigate } from "react-router-dom"
import './NuevaCita.css'

function NuevaCita() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    nombre_cliente: "",
    celular: "",
    efecto_pestanas: "",
    numero_pestanas: "",
    especialista: "",
    observaciones: "",
    fecha: ""
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { error } = await supabase
      .from("citaslashes")
      .insert([form])

    if (error) {
      console.log(error)
    } else {
      navigate("/") 
    }
  }

  return (
    <div className="citas-nuevacita">
      <h2>Agregar nueva cita</h2>

      <form className='citas-dashboard-form' onSubmit={handleSubmit}>
        <input name="nombre_cliente" placeholder="Cliente" onChange={handleChange} />
        <input name="celular" placeholder="Celular" onChange={handleChange} />
        <input name="efecto_pestanas" placeholder="Efecto" onChange={handleChange} />
        <input name="numero_pestanas" placeholder="# Pestañas" onChange={handleChange} />
        <input name="especialista" placeholder="Especialista" onChange={handleChange} />
        <input name="observaciones" placeholder="Observaciones" onChange={handleChange} />
        <input name="fecha" type="date" onChange={handleChange} />

        <button type="submit">Agregar cita</button>
      </form>
    </div>
  )
}

export default NuevaCita