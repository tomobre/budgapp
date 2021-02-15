import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <Link to="/newdata">Agregar ingreso/egreso</Link>
      <Link to="/">Inicio</Link>
    </div>
  );
}

export default NavBar;
