import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function NavBar() {
  return (
    <div>
      <Navbar className="mb-5 " bg="light" variant="light">
        <Nav className="mr-5 ">
          <Link className="mr-5 text-decoration-none" to="/">
            Inicio
          </Link>
          <Link className="text-decoration-none" to="/newdata">
            Agregar Operación
          </Link>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;
