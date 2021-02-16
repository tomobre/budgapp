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

function NewData() {
  const [concept, setConcept] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [date, setDate] = React.useState("");
  const [type, setType] = React.useState("INGRESO");
  const [response, setResponse] = React.useState("");

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = () => {
    const newInfo = {
      concepto: concept,
      monto: parseInt(amount, 10),
      date: date,
      tipo: type,
    };
    axios
      .post("http://localhost:4000/add", newInfo)
      .then((res) => {
        console.log(res.data);
        setConcept("");
        setAmount("");
        setDate("");
        setType("INGRESO");
        setResponse("Se ha añadido la nueva operacion con exito");

        setTimeout(() => {
          setResponse("");
        }, 5000);
      })
      .catch((err) => {
        setResponse(
          `Hubo un error al añadir la nueva operacion: ${err.response.data.error.message}`
        );
        console.log(err);

        setTimeout(() => {
          setResponse("");
        }, 5000);
      });
  };

  return (
    <div>
      <Wrapper className="container">
        <h3 className="mb-5 text-center">NUEVA OPERACIÓN</h3>
        <Form>
          <Form.Group>
            <Form.Control
              ref={register({
                required: {
                  value: true,
                  message: "La fecha es requerida",
                },
              })}
              name="date"
              type="date"
              placeholder="fecha"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              ref={register({
                required: {
                  value: true,
                  message: "El concepto de la operacion  es requerido",
                },
                maxLength: {
                  value: 50,
                  message: "El concepto no debe tener  más de 50 caracteres",
                },
                minLength: {
                  value: 4,
                  message: "El concepto debe tener como minimo  4 caracteres",
                },
              })}
              name="concept"
              placeholder="Concepto"
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              type="text"
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              ref={register({
                required: {
                  value: true,
                  message: "El monto a cargar es requerido",
                },
                min: { value: 1, message: "Monto no valido" },
              })}
              name="amount"
              type="number"
              placeholder="Monto"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Control
              as="select"
              onChange={(e) => setType(e.target.value)}
              placeholder="Tipo"
            >
              <option value="INGRESO">INGRESO</option>
              <option value="EGRESO">EGRESO</option>
            </Form.Control>
          </Form.Group>
          <span className="text-danger text-small d-block mb-2">
            {errors.date && errors.date.message}
          </span>
          <span className="text-danger text-small d-block mb-2">
            {errors.amount && errors.amount.message}
          </span>
          <span className="text-danger text-small d-block mb-2">
            {errors.concept && errors.concept.message}
          </span>
          <div className=" mt-5 mb-2 d-flex justify-content-center">
            <Button onClick={handleSubmit(onSubmit)} variant="primary">
              Enviar
            </Button>
          </div>
        </Form>
      </Wrapper>
      <h3 className="text-center mt-5">{response}</h3>
    </div>
  );
}

export default NewData;
