import { useState } from "react"
import "./App.css"
import { Inicio } from "./paginas/Inicio"
import { Explorar } from "./paginas/explorar"
import { Perfil } from "./paginas/perfil"
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom"
import Login from "./paginas/login"
import logo from "./assets/LOGO.png"

function App() {
  return (
    <BrowserRouter>
      <>
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
                <button className="login">Iniciar sesión</button>
              </li>
            </ul>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Inicio />}></Route>
          <Route path="/explorar" element={<Explorar />}></Route>
          <Route path="/perfil" element={<Perfil />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </>
    </BrowserRouter>
  )
}

export default App
