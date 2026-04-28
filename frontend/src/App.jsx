import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useState } from "react";
import Login from "./modules/login/login";
import Productos from "./modules/productos/productos";
import Sidebar from "./modules/sidebar/sidebar";
import Proveedores from "./modules/proveedores/proveedores";
import Clientes from "./modules/clientes/clientes";
import Registro from "./modules/register/register";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  return (
    <div className="app-layout" style={{ display: "flex" }}>
      {isAuthenticated &&
        !["/login", "/registro"].includes(location.pathname) && <Sidebar />}

      <div className="main-content" style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />

          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />

          <Route path="/registro" element={<Registro />} />

          <Route
            path="/productos"
            element={isAuthenticated ? <Productos /> : <Navigate to="/login" />}
          />
          <Route
            path="/proveedores"
            element={
              isAuthenticated ? <Proveedores /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/clientes"
            element={isAuthenticated ? <Clientes /> : <Navigate to="/login" />}
          />

          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
