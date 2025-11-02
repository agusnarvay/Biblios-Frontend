import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "../estilos/inicio.css"
import portadaBiblio from "../assets/portadaBiblio.png"
import { CardLibro } from "../componentes/CardLibro"

const Inicio = () => {
  const [librosRecientes, setLibrosRecientes] = useState(
    []
  ) /*Array vacío porque se cargarán los libros solo una vez */
  useEffect(() => {
    {
      /*Define el efecto secundario del componente */
    }
    const fetchLibrosRandom = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_EXPRESS}/api/libros/random?limit=4`
        ) /*Variable de entorno en .env*/

        if (!response.ok) {
          const errorData = await response.text()
          console.error("Error del servidor:", errorData)
          setLibrosRecientes([])
          return
        }

        const data = await response.json()

        setLibrosRecientes(data) /*Data ya es el array de los libros*/
      } catch (error) {
        console.error("Error al cargar libros aleatorios", error)
      }
    }
    fetchLibrosRandom()
  }, [])

  return (
    /*Sección hero - pagina principal. Donde se explicará de que va la página web */
    <div className="pagina-inicio">
      <section className="hero-section">
        <div className="hero-imagen">
          <img src={portadaBiblio} alt="Portada" className="portada-hero" />
        </div>
        <div className="hero-contenido-overlay">
          <h1>Tu universo literario personal te espera</h1>
          <p>
            Organiza tu biblioteca, explira nuevos títulos y conecta con otras
            lecturas.
          </p>
          <Link to="/perfil" className="boton-principal">
            ¡Comienza tu viaje literario!
          </Link>
        </div>
      </section>

      <section className="agregar-libros">
        <h2>Empieza a construir tu biblioteca en 3 pasos:</h2>
        <div className="pasos-grid-agregar">
          <div className="paso-numero">
            <h3>Crea tu cuenta ✍🏼</h3>
            <p>
              Únete a Biblios en segundos. Es gratis y abre las puertas a tu
              mundo de lectura.
            </p>
          </div>

          <div className="paso-numero">
            <h3>Añade tus libros 📖</h3>
            <p>
              Busca un título, completa los detalles y ¡listo! Tu libro, en tu
              colección en cuestión de minutos.
            </p>
          </div>
          <div className="paso-numero">
            <h3>Edita y elimina ✅</h3>
            <p>
              Puedes editarlos y eliminarlos. Gestiona tus listas y descubre
              nuevas historias en nuestra página.
            </p>
          </div>
        </div>

        <Link to="/perfil" className="boton-secundario-cta">
          Quiero empezar ahora
        </Link>
      </section>
      <section className="explorar-libros">
        <h2>Libros destacados</h2>
        {librosRecientes.length === 0 ? (
          <p className="sin-libros"></p>
        ) : (
          <div className="libros-grid">
            {librosRecientes.map((libro) => (
              <CardLibro key={libro._id} libro={libro} />
            ))}
          </div>
        )}
        {librosRecientes.length > 0 && (
          <Link to="/perfil" className="boton-secundario">
            Ver todos los libros
          </Link>
        )}
      </section>
    </div>
  )
}

export default Inicio
