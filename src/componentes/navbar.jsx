import { NavLink } from "react-router-dom"

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
            <NavLink to="/login">
              <button className="login">Iniciar sesión</button>
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  )
}
