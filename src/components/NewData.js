import React from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styled from "styled-components/macro";

const Wrapper = styled.div`
  background-color: white;
  border-radius: 0.375rem;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.15);
  padding: 3rem;
  margin-bottom: 2rem;
`;

function NewData() {
  const [concept, setConcept] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [date, setDate] = React.useState(new Date());
  const [type, setType] = React.useState("INGRESO");
  const [category, setCategory] = React.useState("FIJO");
  const [response, setResponse] = React.useState({ state: false, message: "" });

  const timeout = React.useRef(undefined);
  const { register, handleSubmit, errors, control } = useForm({
    reValidateMode: "onSubmit",
  });

  React.useEffect(() => {
    return () => {
      if (timeout.current !== undefined) {
        clearTimeout(timeout.current);
      }
    };
  }, []);

  const onSubmit = () => {
    const checkUser = localStorage.getItem("user");
    if (checkUser) {
      setResponse({ state: true, message: "Cargando..." });
      let dateTransf = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`;
      console.log(dateTransf);
      const newInfo = {
        concept: concept,
        amount: parseInt(amount, 10),
        date: dateTransf,
        type: type,
        user: checkUser,
        category: category,
      };
      axios
        .post("https://budgapp-back.herokuapp.com/add", newInfo)
        .then((res) => {
          setConcept("");
          setAmount("");
          setDate(false);
          setResponse({
            state: true,
            message: "Se ha añadido la nueva operacion con exito",
          });

          timeout.current = setTimeout(() => {
            setResponse({ state: false, message: "" });
          }, 5000);
        })
        .catch((err) => {
          setResponse({
            state: true,
            message: `Ocurrio un error ${
              err.response ? err.response.status : 503
            } al registrarse: ${err.response ? err.response.data[0].msg : err}`,
          });
          setTimeout(() => {
            setResponse({ state: false, message: "" });
          }, 5000);
        });
    } else {
      setResponse({ state: true, message: `No se ha ingresado a una cuenta` });
      setTimeout(() => {
        setResponse({ state: false, message: "" });
      }, 5000);
    }
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <div>
      {response.state && (
        <h3 className="text-center mt-5 mb-5">{response.message}</h3>
      )}
      <Wrapper className="container">
        <h3 className="mb-5 text-center">NUEVA OPERACIÓN</h3>
        <Form onKeyUp={handleKeyUp}>
          <Form.Group>
            <Controller
              rules={{
                required: {
                  value: true,
                  message: "La fecha es requerida",
                },
              }}
              name="date"
              defaultValue={date}
              type="date"
              control={control}
              onChange={(date) => setDate(date)}
              render={({ onChange, value }) => (
                <DatePicker
                  wrapperClassName="w-100"
                  placeholderText="Fecha"
                  onChange={(value) => setDate(value)}
                  selected={date}
                  dateFormat="dd/MM/yyyy"
                  maxDate={new Date()}
                  showYearDropdown
                  scrollableMonthYearDropdown
                  customInput={<Form.Control />}
                />
              )}
            />
          </Form.Group>
          <Form.Group>
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
                max: {
                  value: 1000000,
                  message: "Monto mayor a un millon no valido",
                },
              })}
              name="amount"
              type="number"
              placeholder="Monto"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Form.Group>
          <div key="1456">
            <Form.Group>
              <Form.Control
                as="select"
                onChange={(e) => {
                  setType(e.target.value);
                  setCategory(
                    e.target.value === "INGRESO" ? "FIJO" : "ALIMENTACION"
                  );
                }}
              >
                <option value="INGRESO">INGRESO</option>
                <option value="EGRESO">EGRESO</option>
              </Form.Control>
            </Form.Group>
          </div>
          {type === "INGRESO" ? (
            <div key="181">
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Control
                  as="select"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option defaultValue value="FIJO">
                    FIJO{" "}
                  </option>
                  <option value="VARIABLE">VARIABLE</option>
                  <option value="EXTRAORDINARIO">EXTRAORDINARIO</option>
                </Form.Control>
              </Form.Group>
            </div>
          ) : (
            <div key="1813">
              <Form.Group>
                <Form.Control
                  as="select"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option defaultValue value="ALIMENTACION">
                    {" "}
                    ALIMENTACION
                  </option>
                  <option value="CUENTA Y PAGOS">CUENTA Y PAGOS</option>
                  <option value="CASA">CASA</option>
                  <option value="TRANSPORTE">TRANSPORTE</option>
                  <option value="SALUD E HIGIENE">SALUD E HIGIENE</option>
                  <option value="DIVERSION">DIVERSION</option>
                  <option value="OTROS">OTROS</option>
                </Form.Control>
              </Form.Group>
            </div>
          )}

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
    </div>
  );
}

export default NewData;
