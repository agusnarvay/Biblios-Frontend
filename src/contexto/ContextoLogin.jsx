import React, { createContext, useState } from "react"

export const ContextoLogin = createContext()

/* Este componente lo que hace es envolver la aplicación para dar acceso al contexto
Lógica para que, al actualizar, siga la sesión inciada
*/

export const ProveedorLogin = ({ children }) => {
  const [estaLogueado, setEstaLogueado] = useState(() => {
    return localStorage.getItem("estaLogueado") === "true"
  })
  const [usuario, setUsuario] = useState(() => {
    try {
      const usuarioGuardado = localStorage.getItem("usuario")
      return usuarioGuardado ? JSON.parse(usuarioGuardado) : null
    } catch (error) {
      return null
    }
  })

  const iniciarSesion = (datoLogin) => {
    const objetoUsuario = {
      _id: datoLogin.usuarioId,
      usuario: datoLogin.nombreUsuario,
    }
    localStorage.setItem("estaLogueado", "true")
    localStorage.setItem("usuario", JSON.stringify(objetoUsuario))
    setUsuario(objetoUsuario)
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
