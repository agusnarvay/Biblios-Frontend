import { NavLink, useNavigate } from "react-router-dom"
import "../estilos/navbar.css"
import logo from "../assets/logoBiblios.png"
import { useContext, useState } from "react"
import { ContextoLogin } from "../contexto/ContextoLogin"

export function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto)
  }

  const { estaLogueado, usuario, cerrarSesion } = useContext(ContextoLogin)
  const navigate = useNavigate()

  const cierreSesion = () => {
    console.log("Ejecutando el cierre y dirije a inicio")
    navigate("/")
    setTimeout(() => {
      cerrarSesion()
      setMenuAbierto(false)
    }, 50)
  }
  return (
    <header className="menu-p">
      <div className="menu-contenedor">
        <NavLink to="/" onClick={() => setMenuAbierto(false)}>
          <img src={logo} alt="LOGO" className="logo" />
        </NavLink>

        <button className="menu-hamburguesa" onClick={toggleMenu}>
          <span className="barra"></span>
          <span className="barra"></span>
          <span className="barra"></span>
        </button>
        <ul className={`menu-lista ${menuAbierto ? "activo" : ""}`}>
          <li>
            <NavLink to="/" onClick={toggleMenu}>
              Inicio
            </NavLink>
          </li>
          {estaLogueado && (
            <li>
              <NavLink to="/perfil" onClick={toggleMenu}>
                Mi perfil
              </NavLink>
            </li>
          )}
        </ul>
        <div
          className={`navbar-login-click ${
            menuAbierto ? "login-mobile-activo" : ""
          }`}
        >
          {estaLogueado ? (
            <button onClick={cierreSesion} className="login">
              Cerrar Sesión
            </button>
          ) : (
            <NavLink
              to="/login"
              className="login"
              onClick={() => {
                setMenuAbierto(false)
              }}
            >
              Iniciar sesión
            </NavLink>
          )}
        </div>
      </div>
    </header>
  )
}
