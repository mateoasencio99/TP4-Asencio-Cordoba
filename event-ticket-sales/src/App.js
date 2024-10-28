import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Nav from "./nav/nav";
import Principal from "./principal/principal";
import Footer from "./footer/footer";
import Eventos from "./evento/evento";
import Detalles from "./detalles/detalles"; // Importa el componente Detalles

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<Principal />} />
          <Route path="/eventos" element={<Eventos />} /> {/* Ruta para la vista de Eventos */}
          <Route path="/detalles/:id" element={<Detalles />} /> {/* Ruta para los detalles del evento */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
