import React, { useContext, useEffect, useRef, useState } from "react"
import { ContextoLogin } from "../contexto/ContextoLogin"
import "../estilos/perfil.css"
import { CardLibro } from "../componentes/CardLibro"

//página del perfil del usuario -> todos los usuarios tienen su propia página de perfil.

export function Perfil() {
  const { VITE_EXPRESS } = import.meta.env
  const { usuario } = useContext(ContextoLogin)
  const [libros, setLibros] = useState([])
  const formAgregarLibro = useRef()

  useEffect(() => {
    if (usuario && usuario._id) getLibros() //se cargan los libros solo cuando está el usuario logueado
  }, [usuario])

  const getLibros = async () => {
    if (!usuario) return
    const response = await fetch(
      `${VITE_EXPRESS}/api/libros?usuarioId=${usuario._id}`
    )
    const data = await response.json()
    setLibros(data.data || data)
  }

  const postLibro = async (e) => {
    e.preventDefault()
    const { titulo, autor, genero, sinopsis, publicacion, portadaUrl, leido } =
      formAgregarLibro.current

    const nuevoLibro = {
      titulo: titulo.value,
      autor: autor.value,
      genero: genero.value,
      sinopsis: sinopsis.value,
      publicacion: publicacion.value,
      portadaUrl: portadaUrl.value,
      usuarioId: usuario._id,
      leido: leido.checked,
    }

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoLibro),
    }

    await fetch(`${VITE_EXPRESS}/api/libros`, options)

    getLibros()
    formAgregarLibro.current.reset()
  }

  return (
    <div className="perfil-pagina">
      <div className="encabezado-perfil">
        {usuario && <h1>Bienvenido, {usuario.usuario} 👋🏼</h1>}
        <p>
          Estás en tu centro de mando. Añade los libros que estás leyendo, los
          que te han marcado o los que sueñas con leer. Tu biblioteca personal
          empieza aquí.
        </p>
        <h2>
          Añade tu <span>libro</span> 📚
        </h2>
      </div>
      <form ref={formAgregarLibro} onSubmit={postLibro} className="form-libro">
        <div className="fila-form">
          <input type="text" name="titulo" placeholder="Título" required />
          <input type="text" name="autor" placeholder="Autor" required />
        </div>
        <div className="fila-form">
          <input type="text" name="genero" placeholder="Género" required />
          <input
            type="number"
            name="publicacion"
            placeholder="Año de publicación"
            required
          />
        </div>
        <div className="portada">
          <input
            type="text"
            name="portadaUrl"
            placeholder="URL de la portada"
            required
          />
        </div>

        <div className="fila-form">
          <textarea name="sinopsis" placeholder="Sinopsis"></textarea>
        </div>
        <div className="form-leido">
          <input type="checkbox" id="leido" name="leido" />
          <label htmlFor="leido">¿Ya lo has leído?</label>
        </div>
        <input type="submit" value="Añadir libro" />
      </form>
      {/*
      <div className="coleccion-contenedor">
        <h2>Mi colección</h2>
        <div className="contenedor-libros">
          {libros.length > 0 ? (
            libros.map((libro) => <CardLibro key={libro._id} libro={libro} />)
          ) : (
            <p>Aún no tienes libros en tu colección</p>
          )}
        </div>
      </div>
      */}
    </div>
  )
}

export default Perfil
