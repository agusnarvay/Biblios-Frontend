import React from "react"
import { NavLink } from "react-router-dom"
import logo from "../assets/logoblanco.png"
import "../estilos/footer.css"

export function Footer() {
  return (
    <footer className="footer-main">
      <div className="footer-container">
        <div className="column1">
          <img src={logo} alt="logo biblios" className="footer-logo" />
        </div>
        <div className="column2">
          <ul className="footer-list">
            <li>
              <NavLink to="/">Inicio</NavLink>
            </li>
            <li>
              <NavLink to="/perfil">Mi perfil</NavLink>
            </li>
            <li>
              <NavLink to="/explorar">Explorar</NavLink>
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
