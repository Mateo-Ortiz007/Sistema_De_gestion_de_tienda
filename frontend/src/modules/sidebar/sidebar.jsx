import { useNavigate } from "react-router-dom";
import "./sidebar.css";
import { useState } from "react";

function Sidebar() {
  const [exitModalOpen, setExitModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <h2 className="brand-logo brand-logo--sm">Panel</h2>
      <button onClick={() => navigate("/productos")}>🛒 Productos</button>
      <button onClick={() => navigate("/proveedores")}>📦 Proveedores</button>
      <button onClick={() => navigate("/clientes")}>👥 Clientes</button>

      <hr />
      <button onClick={() => setExitModalOpen(true)}>🔒 Cerrar sesión</button>

      {exitModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>¿Quieres cerrar sesión?</h3>
            <div className="modal-buttons">
              <button onClick={handleLogout} className="confirm">
                Sí
              </button>
              <button
                onClick={() => setExitModalOpen(false)}
                className="cancel"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
