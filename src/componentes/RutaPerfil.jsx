import React, { useContext } from "react"
import { ContextoLogin } from "../contexto/ContextoLogin"
import { Navigate } from "react-router-dom"

export const RutaPerfil = ({ children }) => {
  const { estaLogueado } = useContext(ContextoLogin)

  if (!estaLogueado) {
    return <Navigate to="/login" />
  }
  return children
}
