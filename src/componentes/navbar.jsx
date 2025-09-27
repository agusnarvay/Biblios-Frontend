import { NavLink } from "react-router-dom"
import Login from "../paginas/login"
import "../estilos/navbar.css"
import logo from "../assets/logoBiblios.png"

export function Navbar() {
  return (
    <header className="menu-principal">
      <div className="menu-contenedor">
        <img src={logo} alt="LOGO" className="logo" />
        <ul className="menu-lista">
          <li>
            <NavLink to="/">Inicio</NavLink>
          </li>
          <li>
            <NavLink to="/perfil">Mi perfil</NavLink>
          </li>
          <li>
            <NavLink to="/explorar">Explorar</NavLink>
          </li>
          <li>
            <NavLink to="/login" className="login">
              Iniciar sesión
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  )
}
