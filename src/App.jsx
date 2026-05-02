import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import Dashboard from './Dashboard.jsx'
import Login from './Login.jsx'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // 🔹 Obtener usuario actual
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })

    // 🔹 Escuchar cambios de sesión
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

  return (
    <div>
      <h1>Bienvenido {user.email}</h1>
      <Dashboard user={user} />
    </div>
  )
}

export default App