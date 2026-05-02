import { useNavigate } from "react-router-dom";
import "./sidebar.css";
import { useState, useEffect } from "react";

function Sidebar() {
  const [exitModalOpen, setExitModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // 👈 control sidebar
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  useEffect(() => {
    let startX = 0;
    let endX = 0;

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
      endX = e.changedTouches[0].clientX;

      // 👉 abrir (desde borde izquierdo)
      if (startX < 50 && endX > startX + 50) {
        setIsOpen(true);
      }

      // 👉 cerrar
      if (endX < startX - 50) {
        setIsOpen(false);
      }
    };

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <div className={`sidebar ${isOpen ? "active" : ""}`}>
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