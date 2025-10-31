import React, { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ContextoLogin } from "../contexto/ContextoLogin"

export function DetalleLibro() {
  const { id } = useParams() //Se necesitarán los id para manejar los libros del formulario, desde la URL
  const { VITE_EXPRESS } = import.meta.env
  const { usuario } = useContext(ContextoLogin) //Se necesita contexto para poder obtener los datos y modificarlos
  const navigate = useNavigate()

  const [libro, setLibro] = useState(null) //Estado utilizado para guardar los datos del libro
  const [errorCarga, setErrorCarga] = useState(null) //Es un manejo de errores de edición

  const [modoEdicion, setModoEdicion] = useState(false) //Controla si estamos solamente mirando los datos o editandolos
  const [datosFormulario, setDatosFormulario] = useState({}) //Guarda los datos del formulario de edicion

  //Obtiene el libro al cargar

  useEffect(() => {
    const obtenerLibro = async () => {
      try {
        setErrorCarga(null) //Se agregó para limpiar errores
        const response = await fetch(`${VITE_EXPRESS}/api/libros/${id}`)
        if (!response.ok) {
          //Si la respuesta no es Ok, el const errorData lee el mensaje de error del backend
          const errorData = await response.json()
          throw new Error(errorData.message || "Libro no encontrado.")
        }

        const data = await response.json()
        setLibro(data) //data.data es cómo se envían los datos el backend
        setDatosFormulario(data) //Se utilizó para pre rellenar los datos del formulario con la informacion actual
      } catch (error) {
        console.error("Error al obtener detalles del libro:", error) //Se muestra el error en consola
        setErrorCarga(error.message || "No se pudo cargr el libro.")
        setTimeout(() => {
          navigate("/perfil")
        }, 3000) //Redirige al perfil luego del error de carga
      }
    }

    obtenerLibro()
  }, [id, VITE_EXPRESS, navigate])

  //Esta función sirve para manejar los cambios dentro del formulario

  const manejarCambioFormulario = (e) => {
    const { name, value, type, checked } = e.target
    setDatosFormulario((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  //Campo para eliminar libros

  const manejarEliminar = async () => {
    try {
      setErrorCarga(null)
      const response = await fetch(`${VITE_EXPRESS}/api/libros/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Error al eliminar el libro.")
      }
      navigate("/perfil") //Redirige al perfil luego de borrar la película
    } catch (error) {
      console.error("Error al eliminar el libro:", error)
      setErrorCarga(error.message || "No se pudo eliminar el libro.")
    }
  }
  //Campo para manejar los cambios en el formulario

  const manejarGuardarCambios = async (e) => {
    e.preventDefault()
    try {
      setErrorCarga(null)
      const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosFormulario),
      }

      const response = await fetch(`${VITE_EXPRESS}/api/libros/${id}`, options)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Error al actualizar el libro.")
      }

      const libroActualizado = await response.json()
      setLibro(libroActualizado) //Actualiza el estado del libro
      setModoEdicion(false)
    } catch (error) {
      console.error("Error al actualizar el libro", error)
      setErrorCarga(error.message || "No se pudo actalizar el libro")
    }
  }
  if (errorCarga) {
    return (
      <div className="detalles-libro-pag">
        <p className="form-errormsg">{errorCarga}</p>
        <button onClick={() => navigate("/perfil")}>Volver al perfil</button>
      </div>
    )
  }

  if (!libro) {
    return (
      <div className="detalles-libro-pag">
        <h1>Cargando detalles del libro...</h1>
      </div>
    )
  }

  // Se muestra el formulario del 'modo edición'
  if (modoEdicion) {
    return (
      <div className="detalles-libro-pag">
        <form onSubmit={manejarGuardarCambios} className="form-libro">
          <h2>Editando: {libro.titulo}</h2>
          <div className="fila-form">
            <input
              type="text"
              name="titulo"
              value={datosFormulario.titulo || ""}
              onChange={manejarCambioFormulario}
              placeholder="Título"
              required
            />
            <input
              type="text"
              name="autor"
              value={datosFormulario.autor || ""}
              onChange={manejarCambioFormulario}
              placeholder="Autor"
              required
            />
          </div>
          <div className="fila-form">
            <input
              type="text"
              name="genero"
              value={datosFormulario.genero || ""}
              onChange={manejarCambioFormulario}
              placeholder="Género"
              required
            />
            <input
              type="number"
              name="publicacion"
              value={datosFormulario.publicacion || ""}
              onChange={manejarCambioFormulario}
              placeholder="Año de publicación"
              required
            />
          </div>
          <input
            type="text"
            name="portadaUrl"
            value={datosFormulario.portadaUrl || ""}
            onChange={manejarCambioFormulario}
            placeholder="URL de la portada"
            required
          />
          <input
            type="text"
            name="sinopsis"
            value={datosFormulario.sinopsis || ""}
            onChange={manejarCambioFormulario}
            placeholder="Sinopsis"
            required
          />
          <div className="form-leido">
            <input
              type="checkbox"
              id="leido"
              name="leido"
              value={datosFormulario.leido || false}
              onChange={manejarCambioFormulario}
            />
            <label htmlFor="leido">¿Ya lo has leído?</label>
          </div>
          <div className="acciones-form">
            <input
              type="submit"
              value="Guardar cambios"
              className="boton-guardar"
            />
            <button
              type="button"
              onClick={() => setModoEdicion(false)}
              className="boton-cancelar"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    )
  }
  // Si el libro cargó, muestra los detalles del mismo
  return (
    <div className="detalles-del-libro">
      <div className="titulo-libro">
        <h1>{libro.titulo}</h1>
        <h2>por {libro.autor}</h2>
      </div>
      <img
        src={libro.portadaUrl}
        alt={`Portada de ${libro.titulo}`}
        loading="lazy"
        className="portada-titulo"
      />
      <p>Genero: {libro.genero}</p>
      <p>Año: {libro.publicacion}</p>
      <p>Estado: {libro.leido ? "Leido" : "Por leer"}</p>
      <h3>sinopsis</h3>
      <p>{libro.sinopsis}</p>

      {usuario && libro.usuario === usuario._id && (
        <div className="acciones-libro">
          <button onClick={() => setModoEdicion(true)} className="boton-editar">
            Editar libro
          </button>
          <button onClick={manejarEliminar} className="boton-eliminar">
            Eliminar libro
          </button>
        </div>
      )}
    </div>
  )
}
