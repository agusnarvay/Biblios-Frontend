import { useState } from "react"
import "./App.css"
import { Inicio } from "./paginas/Inicio"
import { Explorar } from "./paginas/explorar"
import { Perfil } from "./paginas/perfil"
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom"
import Login from "./paginas/login"
import { Navbar } from "./componentes/navbar"

function App() {
  return (
    <BrowserRouter>
      <>
        <Navbar />

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
