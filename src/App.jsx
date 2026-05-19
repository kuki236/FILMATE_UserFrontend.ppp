import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import IniciarSesion from './Component/IniciarSesion.jsx';
import MenuPrincipal from './Component/MenuPrincipal.jsx';
import Registro from './Component/Registro.jsx';
import Cines from './Component/Cines.jsx';
import Dulceria from './Component/Dulceria.jsx';
import Social from './Component/Social.jsx';
import DetallePelicula from './Component/DetallePelicula.jsx';
import AdminGestion from './Component/AdminGestion.jsx'; // 1. Panel temporal

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IniciarSesion />} />
        <Route path="/menuPrincipal" element={<MenuPrincipal />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/cines" element={<Cines />} />
        <Route path="/dulceria" element={<Dulceria />} />
        <Route path="/social" element={<Social />} />
        <Route path="/menuPrincipal/detallePelicula" element={<DetallePelicula />} />
        
        {/* 2. Ruta de pruebas */}
        <Route path="/pruebas-luis" element={<AdminGestion />} /> 
      </Routes>
    </Router>
  );
}

export default App;
