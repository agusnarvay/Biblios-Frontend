import "./App.css"
import { Inicio } from "./paginas/Inicio"
import { Explorar } from "./paginas/explorar"
import { Perfil } from "./paginas/perfil"
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useLocation,
} from "react-router-dom"
import Login from "./paginas/login"
import { Navbar } from "./componentes/navbar"
import { Footer } from "./componentes/footer"

/*Lo utilice para manejar la lógical del menú - para que no sea visible en /login*/

function Layout() {
  const location = useLocation()

  /*Verifica si la ruta actual esta en la lista de rutas sin menu*/

  const noMenuRoutes = ["/login"]

  const showNavBar = !noMenuRoutes.includes(location.pathname)

  return (
    <>
      {/*Se renderiza la navBar solo cuando el showNavbar es true */}

      {showNavBar && <Navbar />}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Inicio />}></Route>
          <Route path="/explorar" element={<Explorar />}></Route>
          <Route path="/perfil" element={<Perfil />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>

      <Footer />
    </>
  )
}
function App() {
  return (
    <BrowserRouter>
      <>
        <Layout /> {/*Aquí se aplica la logica condicional*/}
      </>
    </BrowserRouter>
  )
}

export default App
