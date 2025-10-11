import React, { createContext, useEffect, useState } from "react"

export const ContextoLogin = createContext()

/* Este componente lo que hace es envolver la aplicación para dar acceso al contexto*/

export const ProveedorLogin = ({ children }) => {
  const [estaLogueado, setEstaLogueado] = useState(false)
  const [usuario, setUsuario] = useState(null)

  /* El useEffect lo usé para revisar el localStorage una sola vez, cuando la página carga. Esto es para que la sesión se mantenga abierta */

  useEffect(() => {
    const loguinGuardado = localStorage.getItem("estaLogueado")
    const usuarioGuardado = localStorage.getItem("usuario")
    if (loguinGuardado === "true" && usuarioGuardado) {
      setEstaLogueado(true)
      setUsuario(usuarioGuardado)
    }
  }, [])

  const iniciarSesion = (usuario) => {
    localStorage.setItem("estaLogueado", "true")
    localStorage.setItem("usuario", usuario)
    setUsuario(usuario)
    setEstaLogueado(true)
  }

  const cerrarSesion = () => {
    localStorage.removeItem("estaLogueado")
    localStorage.removeItem("usuario")
    setUsuario(null)
    setEstaLogueado(false)
  }
  return (
    <ContextoLogin.Provider
      value={{ estaLogueado, usuario, iniciarSesion, cerrarSesion }}
    >
      {children}
    </ContextoLogin.Provider>
  )
}
