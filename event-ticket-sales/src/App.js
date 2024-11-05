import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Nav from "./nav/nav";
import Principal from "./principal/principal";
import Footer from "./footer/footer";
import Eventos from "./evento/evento";
import Detalles from "./detalles/detalles"; 
import Comprar from "./comprar/comprar"; 
import Login from "./login/login";
import Register from "./register/register"; 
import MisCompras from "./misCompras/misCompras";
import { Provider } from "./salesContext/salesContext"

function App() {
  return (
    <Provider>
      <Router>
        <div>
          <Nav />
          <Routes>
            <Route path="/" element={<Principal />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/detalles/:id" element={<Detalles />} />
            <Route path="/comprar/:id" element={<Comprar />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            {/* Ruta para redirigir a la página principal si no se encuentra la ruta */}
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/mis-compras" element={<MisCompras />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;