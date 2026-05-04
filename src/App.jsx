import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import Dashboard from './Dashboard.jsx'
import Login from './Login.jsx'
import NuevaCita from './NuevaCita.jsx'
import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])


  if (!user) return <Login />

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }


  // ✅ Si está logueado → usar rutas
  return (
    <BrowserRouter>
      <div>
        <div className='citas-cabezera'>
          <h1>Bienvenido</h1>
          <button onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
        


        <Routes>
          <Route path="/" element={<Dashboard user={user} />} />
          <Route path="/nueva-cita" element={<NuevaCita />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App