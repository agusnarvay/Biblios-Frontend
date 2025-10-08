import { NavLink } from "react-router-dom"
import Login from "../paginas/login"
import "../estilos/navbar.css"
import logo from "../assets/logoBiblios.png"
import { useState } from "react"

export function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto)
  }
  return (
    <header className="menu-main">
      <div className="menu-container">
        <NavLink to="/" onClick={() => setMenuAbierto(false)}>
          <img src={logo} alt="LOGO" className="logo" />
        </NavLink>
        <button className="menu-hamburger" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        <ul className={`menu-list ${menuAbierto ? "activo" : ""}`}>
          <li>
            <NavLink to="/" onClick={toggleMenu}>
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/perfil" onClick={toggleMenu}>
              Mi perfil
            </NavLink>
          </li>
          <li>
            <NavLink to="/explorar" onClick={toggleMenu}>
              Explorar
            </NavLink>
          </li>
        </ul>
        <NavLink
          to="/login"
          className={`login ${menuAbierto ? "login-mobile-activo" : ""}`}
          onClick={Login}
        >
          Iniciar sesión
        </NavLink>
      </div>
    </header>
  )
}
