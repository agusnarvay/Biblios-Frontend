import "./App.css"
import { Perfil } from "./paginas/perfil"
import { Navbar } from "./componentes/Navbar"
import { Footer } from "./componentes/Footer"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import Login from "./paginas/login"
import { ProveedorLogin } from "./contexto/ContextoLogin"
import { RutaPerfil } from "./componentes/RutaPerfil"
import { DetalleLibro } from "./componentes/DetalleLibro"
import Inicio from "./paginas/TempInicio"
/*Lo utilice para manejar la lógical del menú - para que no sea visible en /login*/

function Layout() {
  const location = useLocation()

  /*Verifica si la ruta actual esta en la lista de rutas sin menu*/

  const noMenuRoutes = ["/login"]

  const showNavBar = !noMenuRoutes.includes(location.pathname)
  {
    /*Se renderiza la navBar solo cuando el showNavbar es true */
  }

  return (
    <div className="contenedor-app">
      {showNavBar && <Navbar />}
      <div className="contenedor-p">
        <Routes>
          <Route path="/" element={<Inicio />}></Route>
          <Route
            path="/perfil"
            element={
              <RutaPerfil>
                <Perfil />
              </RutaPerfil>
            }
          ></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/libros/:id" element={<DetalleLibro />}></Route>
        </Routes>
      </div>

      {showNavBar && <Footer />}
    </div>
  )
}
function App() {
  return (
    <BrowserRouter>
      {/*Ahora todos tienen acceso al contexto creado */}

      <ProveedorLogin>
        <Layout /> {/*Aquí se aplica la logica condicional*/}
      </ProveedorLogin>
    </BrowserRouter>
  )
}

export default App
