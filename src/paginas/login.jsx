import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../estilos/login.css"
import logo from "../assets/logoBiblios.png"

function Login() {
  //Los uso para guardar lo que el usuario escribe
  const [usuario, setUsuario] = useState("")
  const [contrasena, setContrasena] = useState("")
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  console.log("La URL de la Api es:", import.meta.env.VITE_EXPRESS)

  const enviarFormulario = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      const response = await fetch(
        `${import.meta.env.VITE_EXPRESS}/api/usuarios/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ usuario, contrasena }),
        }
      )
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Error al iniciar sesión")
      }
      console.log("Login exitoso:", data)
      navigate("/perfil")
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="login-contenedor">
      <div className="login-header">
        <img src={logo} alt="BIBLIOS logo" className="login-logo" />
        <h1>Inicia sesión en tu cuenta</h1>
        <div className="login-tarjeta">
          <form onSubmit={enviarFormulario} className="login-form">
            <div className="input">
              <label htmlFor="usuario">Usuario</label>
              <input
                type="text"
                id="usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="Ingresa tu nombre de usuario"
                required
              />
            </div>
            <div className="input">
              <label htmlFor="contrasena">Contrasena</label>
              <input
                type="password"
                id="contrasena"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>
            <button type="submit" className="login-boton">
              Ingresar
            </button>
            {error && <p className="error-msj">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
