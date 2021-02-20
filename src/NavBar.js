import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import styled from "styled-components/macro";

const Img = styled.img`
  margin-left: 1rem;
  cursor: pointer;
  padding-bottom: 1rem;
`;

const Acount = styled.div`
  position: absolute;
  right: 0;
  color: #3d81ff;
  display: flex;
  justify-content: right;
  align-items: center;
`;

function NavBar() {
  const [user, setUser] = React.useState(localStorage.getItem("user"));

  const deleteToken = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
    setUser(null);
  };

  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="mb-5 "
        bg="light"
        variant="light"
      >
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-5 ">
            <Link className="mr-5 text-decoration-none" to="/">
              Inicio
            </Link>

            <Link className=" mr-5 text-decoration-none" to="/login">
              Ingresar
            </Link>
            <Link className=" mr-5 text-decoration-none" to="/register">
              Registrarse
            </Link>
            <Link className=" mr-5 text-decoration-none" to="/newdata">
              Agregar Operación
            </Link>
            <Link className=" mr-5 text-decoration-none" to="/categories">
              Categorias
            </Link>
            {user !== null && (
              <Acount>
                <p>{user.toUpperCase()}</p>
                <Img
                  alt="Log Out"
                  onClick={deleteToken}
                  src="https://icongr.am/feather/log-out.svg?size=20&color=3d81ff"
                ></Img>
              </Acount>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;
