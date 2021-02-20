import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styled from "styled-components/macro";

const Wrapper = styled.div`
  background-color: white;
  border-radius: 0.375rem;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.15);
  padding: 3rem;
`;

function Register() {
  const [user, setUser] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [response, setResponse] = React.useState({ state: false, message: "" });

  const { register, handleSubmit, errors } = useForm();

  const onRegister = () => {
    setResponse({ state: true, message: "Cargando..." });
    axios
      .post("http://localhost:4000/register", {
        user: user,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        setResponse({ state: true, message: "Se ha registrado con exito" });

        setTimeout(() => {
          setResponse({ state: false, message: "" });
        }, 5000);
      })
      .catch((err) => {
        console.log(err);
        setResponse({
          state: true,
          message: "Ocurrio un problema al registrarse",
        });
        setTimeout(() => {
          setResponse({ state: false, message: "" });
        }, 5000);
      });
  };

  return (
    <div>
      <Wrapper className="container">
        <h3 className="mb-5 text-center">REGISTRO</h3>
        <Form>
          <Form.Group>
            <Form.Control
              ref={register({
                required: {
                  value: true,
                  message: "El usuario es requerido",
                },
                maxLength: {
                  value: 50,
                  message:
                    "El usuario/email no debe tener  más de 50 caracteres",
                },
                minLength: {
                  value: 4,
                  message:
                    "El usuario/email debe tener como minimo  4 caracteres",
                },
              })}
              name="user"
              type="text"
              placeholder="Usuario/Email"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              ref={register({
                required: {
                  value: true,
                  message: "La contraseña  es requerida",
                },
                maxLength: {
                  value: 50,
                  message: "La contraseña no debe tener  más de 50 caracteres",
                },
                minLength: {
                  value: 4,
                  message: "La contraseña debe tener como minimo  4 caracteres",
                },
              })}
              name="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </Form.Group>

          <span className="text-danger text-small d-block mb-2">
            {errors.user && errors.user.message}
          </span>
          <span className="text-danger text-small d-block mb-2">
            {errors.password && errors.password.message}
          </span>

          <div className=" mt-5 mb-2 d-flex justify-content-center">
            <Button onClick={handleSubmit(onRegister)} variant="primary">
              Enviar
            </Button>
          </div>
        </Form>
      </Wrapper>
      {response.state && (
        <h3 className="text-center mt-5">{response.message}</h3>
      )}
    </div>
  );
}

export default Register;
