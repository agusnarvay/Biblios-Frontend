import { NavLink } from "react-router-dom"
import logo from "../assets/logoblanco.png"
import "../estilos/footer.css"

export function Footer() {
  return (
    <footer className="footer-p">
      <div className="footer-contenedor">
        <div className="columna1">
          <NavLink to="/">
            <img src={logo} alt="logo biblios" className="footer-logo" />
          </NavLink>
        </div>
        <div className="columna2">
          <ul className="footer-lista">
            <li>
              <NavLink to="/">Inicio</NavLink>
            </li>
            <li>
              <NavLink to="/perfil">Mi perfil</NavLink>
            </li>
          </ul>
        </div>
        <p className="footer-cr">
          © 2025 BIBLIOS. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
