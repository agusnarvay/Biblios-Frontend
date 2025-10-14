import React from "react"
import { Link } from "react-router-dom"
import "../estilos/card-libro.css"

export function CardLibro({ libro }) {
  return (
    <div className="libro-card">
      <Link to={`/libro/${libro._id}`} className="libro-link">
        <img
          src={libro.portadaUrl}
          alt={`Portada de ${libro.titulo}`}
          className="libro-portada"
        />
      </Link>
      <div className="libro-info">
        <h3>{libro.titulo}</h3>
        <p>{libro.autor}</p>
      </div>
    </div>
  )
}
