import React, { useContext, useEffect, useRef, useState } from "react"
import { ContextoLogin } from "../contexto/ContextoLogin"
import "../estilos/perfil.css"

//página del perfil del usuario -> todos los usuarios tienen su propia página de perfil.

export function Perfil() {
  const { VITE_EXPRESS } = import.meta.env
  const { usuario } = useContext(ContextoLogin)
  const [libros, setLibros] = useState([])
  const formAgregarLibro = useRef()

  useEffect(() => {
    console.log("useEffect funciona", usuario)
    if (usuario && usuario._id) getLibros() //se cargan los libros solo cuando está el usuario logueado
  }, [usuario])

  const getLibros = async () => {
    const response = await fetch(
      `${VITE_EXPRESS}/api/libros?usuarioId=${usuario._id}`
    )
    const data = await response.json()
    setLibros(data.data)
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

  const deleteLibro = async (id) => {
    const options = { method: "DELETE" }
    await fetch(`${VITE_EXPRESS}/api/libros/${id}`, options)

    getLibros()
  }

  return (
    <>
      <div className="perfil-pagina">
        <div className="encabezado-perfil">
          {usuario && <h1>Bienvenido, {usuario.usuario} 📚</h1>}
          <p>
            Estás en tu centro de mando. Añade los libros que estás leyendo, los
            que te han marcado o los que sueñas con leer. Tu biblioteca personal
            empieza aquí.
          </p>
          <h2>
            Añadir un nuevo <span>libro</span>
          </h2>
        </div>
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
        <input
          type="text"
          name="portadaUrl"
          placeholder="URL de la portada"
          required
        />
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
        <h1>Mi colección</h1>
      <ul>
        {libros.length === 0 && <li>No hay libros en tu colección</li>}
        {libros.map((libro) => (
          <li key={libro._id}>
            <span>
              {libro.titulo} por {libro.autor}
            </span>
            <button onClick={() => deleteLibro(libro._id)}>
              Eliminar libro
            </button>
          </li>
        ))}
      </ul>
   */}
    </>
  )
}

export default Perfil
