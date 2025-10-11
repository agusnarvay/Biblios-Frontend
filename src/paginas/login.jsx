import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ContextoLogin } from "../contexto/contexto-login"
import "../estilos/login.css"
import logo from "../assets/logoBiblios.png"

//Este es el apartado del login/iniciar sesión para los usuarios. Consta de un bloque para ingresar usuario y contraseña y un botón submit para enviar esa información e ingresar al perfil del usuario. Se creó el usuario con Postman.

function Login() {
  //Los uso para guardar lo que el usuario escribe
  const [usuario, setUsuario] = useState("")
  const [contrasena, setContrasena] = useState("")
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const { iniciarSesion } = useContext(ContextoLogin)

  const URL_API_EXPRESS = import.meta.env.VITE_EXPRESS

  const enviarFormulario = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      const respuesta = await fetch(`${URL_API_EXPRESS}/api/usuarios/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, contrasena }),
      })
      const datosRespuesta = await respuesta.json()

      if (!respuesta.ok) {
        throw new Error(
          datosRespuesta.message ||
            "Error al iniciar sesión. Nombre de usuario o contraseña incorrectos."
        )
      }
      console.log(
        "Login exitoso: guardando datos en localStorage",
        datosRespuesta
      )
      iniciarSesion(datosRespuesta)

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
