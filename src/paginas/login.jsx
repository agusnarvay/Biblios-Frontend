import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() {
  //Los uso para guardar lo que el usuario escribe
  const [usuario, setUsuario] = useState("")
  const [contrasena, setContrasena] = useState("")
  const [error, setError] = useState(null)

  const navigate = useNavigate()

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
        new Error(data.message || "Error al iniciar sesión")

        console.log("Login exitoso:", data)
        navigate("/perfil")
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="contenedor-login">
      <h2>Iniciar sesión</h2>
      <form onSubmit={enviarFormulario}>
        <div>
          <label htmlFor="usuario">Usuario</label>
          <input
            type="text"
            id="usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="contrasena">Contrasena</label>
          <input
            type="password"
            id="contrasena"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
        </div>
        <button type="submit">Ingresar</button>
      </form>
      {error && <p className="error-msg">{error}</p>}
    </div>
  )
}

export default Login
