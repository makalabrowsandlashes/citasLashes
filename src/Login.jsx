import { useState } from 'react'
import { supabase } from './supabaseClient.js'
import makalaLogo from './assets/makala-logo.png'
import './Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      setErrorMsg(error.message)
    } else {
      window.location.href = '/'
    }
  }

  return (
    <div className='citas-login' >
      <img src={ makalaLogo }/>
      <span>Registros - Citas de pestañas</span>
      <h2>Iniciar sesión</h2>

      <form onSubmit={handleLogin}>
        <div className='citas-login-input'>
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='citas-login-input'>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Ingresar</button>
      </form>

      {errorMsg && <span style={{ color: 'red' }}>{errorMsg}</span>}
    </div>
  )
}

export default Login