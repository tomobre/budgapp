// https://aprendizfinanciero.com/como-categorizar-tus-gastos/
// https://www.inbestme.com/blog/el-presupuesto-ingresos/

import React from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styled from "styled-components/macro";

const Wrapper = styled.div`
  background-color: white;
  border-radius: 0.375rem;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.15);
  padding: 3rem;
  margin-bottom: 3rem;
  margin-right: 3rem;
  margin-left: 3rem;
`;

const Total = styled.td`
  font-weight: 700;
`;

const Img = styled.img`
  cursor: pointer;
`;

function Home() {
  const [data, setData] = React.useState([]);
  const [modifyOk, setModifyOk] = React.useState({ state: false, id: "" });
  const [modifyConcept, setModifyConcept] = React.useState("");
  const [modifyAmount, setModifyAmount] = React.useState("");
  const [modifyDate, setModifyDate] = React.useState("");
  const [modifyCategory, setModifyCategory] = React.useState("");
  const [totalCount, setTotalCount] = React.useState(0);
  const [type, setType] = React.useState("");
  const [filterCategory, setFilterCategory] = React.useState("TODAS");
  const [visible, setVisible] = React.useState({ beg: 0, end: 10 });

  const [response, setResponse] = React.useState("");

  const { register, handleSubmit, errors } = useForm();

  React.useEffect(() => {
    const checkToken = localStorage.getItem("token");
    let mounted = true;
    if (checkToken) {
      axios
        .get("http://localhost:4000/user/auth", {
          headers: { "x-access-token": localStorage.getItem("token") },
        })
        .then((res) => {
          if (mounted) {
            let user = localStorage.getItem("user");

            axios
              .get(`http://localhost:4000/operations/${user}`)
              .then((info) => {
                setData(info.data);

                let sumIng = data
                  .filter((el) => {
                    return el.type === "INGRESO";
                  })
                  .reduce((prev, next) => {
                    return { amount: prev.amount + next.amount };
                  });

                let sumEgr = data
                  .filter((el) => {
                    return el.type === "EGRESO";
                  })
                  .reduce((prev, next) => {
                    return { amount: prev.amount + next.amount };
                  });

                setTotalCount(sumIng.amount - sumEgr.amount);
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return function cleanup() {
      mounted = false;
    };
  }, [data, totalCount]);

  const handleModif = (e) => {
    axios
      .get(`http://localhost:4000/operations/user/${e.target.id}`)
      .then((res) => {
        console.log(res.data);
        setModifyOk({ state: true, id: e.target.id });
        setModifyConcept(res.data[0].concept);
        setModifyAmount(res.data[0].amount);
        setModifyDate(res.data[0].date.slice(0, 10));
        setType(res.data[0].type);
      })
      .catch((err) => console.log(err));
  };

  const onSubmit = () => {
    let updateData = {
      concept: modifyConcept,
      amount: parseInt(modifyAmount, 10),
      date: modifyDate,
      category: modifyCategory,
    };
    console.log(updateData);

    axios
      .put(
        `http://localhost:4000/update/${parseInt(modifyOk.id, 10)}`,
        updateData
      )
      .then(() => {
        console.log("modified");
        setModifyOk({ state: false, id: "" });

        setResponse("Se ha modificado la operacion con exito");

        setTimeout(() => {
          setResponse("");
        }, 5000);
      })
      .catch((err) => {
        console.log(err);
        setResponse(
          `Hubo un error al modificar la operacion: ${err.response.data.error.message}`
        );

        setTimeout(() => {
          setResponse("");
        }, 5000);
      });
  };

  const loadMore = () => {
    setVisible({ beg: visible.beg + 10, end: visible.end + 10 });
  };

  const loadBack = () => {
    setVisible({ beg: visible.beg - 10, end: visible.end - 10 });
  };

  const handleDelete = (e) => {
    let conf = window.confirm("¿Esta seguro que desea eliminar la operación?");

    if (conf) {
      axios
        .delete(`http://localhost:4000/delete/${e.target.id}`)
        .then(() => {
          setResponse(`Se eliminó la operacion con exito`);

          setTimeout(() => {
            setResponse("");
          }, 5000);
        })
        .catch((err) => {
          console.log(err);
          setResponse(
            `Hubo un error al intentar eliminar  la operacion: ${err.response.data.error.message}`
          );

          setTimeout(() => {
            setResponse("");
          }, 5000);
        });
    }
  };

  if (!data.length) return <h3>No hay operaciones registradas</h3>;

  return (
    <div>
      <Table className="mb-5" responsive striped bordered hover>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Concepto</th>
            <th>Tipo</th>
            <th>Monto</th>
            <th className="text-center ">
              Categoria
              <Form.Control
                className="mt-3"
                as="select"
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option defaultValue value="TODAS">
                  TODAS
                </option>
                <option value="FIJO">FIJO</option>
                <option value="VARIABLE">VARIABLE</option>
                <option value="EXTRAORDINARIO">EXTRAORDINARIO</option>
                <option value="ALIMENTACION">ALIMENTACION</option>
                <option value="CUENTA Y PAGOS">CUENTA Y PAGOS</option>
                <option value="CASA">CASA</option>
                <option value="TRANSPORTE">TRANSPORTE</option>
                <option value="SALUD E HIGIENE">SALUD E HIGIENE</option>
                <option value="DIVERSION">DIVERSION</option>
                <option value="OTROS">OTROS</option>
              </Form.Control>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length &&
            data
              .filter((op) => {
                if (filterCategory === "TODAS") {
                  return op.category;
                } else {
                  return op.category === filterCategory;
                }
              })
              .slice(visible.beg, visible.end)
              .map((info) => {
                return (
                  <tr key={info.id}>
                    <td>{new Date(info.date).toLocaleDateString()}</td>
                    <td>{info.concept}</td>
                    <td>{info.type}</td>
                    <td>{info.amount} $</td>
                    <td>{info.category} </td>
                    <td>
                      <Img
                        className="mr-3"
                        id={info.id}
                        alt="Modificar"
                        onClick={handleModif}
                        src="https://icongr.am/entypo/new-message.svg?size=25&color=0038e0"
                      ></Img>

                      <Img
                        id={info.id}
                        alt="Eliminar"
                        onClick={handleDelete}
                        src="https://icongr.am/jam/trash-alt.svg?size=26&color=ff0000"
                      ></Img>
                    </td>
                  </tr>
                );
              })}
          <tr>
            <td colSpan="2"></td>
            <Total>TOTAL</Total>
            <Total>{totalCount} $</Total>
          </tr>
        </tbody>
      </Table>
      {visible.beg > 0 && (
        <div className=" mt-1 mb-2 d-flex justify-content-center">
          <Img
            alt="previous"
            src="https://icongr.am/jam/chevrons-circle-left-f.svg?size=30&color=699dfb"
            onClick={loadBack}
          ></Img>
        </div>
      )}
      {visible.end < data.length && (
        <div className=" mt-1 mb-2 d-flex justify-content-center">
          <Img
            alt="next"
            src="https://icongr.am/jam/chevrons-circle-right-f.svg?size=30&color=699dfb"
            onClick={loadMore}
          ></Img>
        </div>
      )}
      {modifyOk.state && (
        <Wrapper>
          <Form>
            <h3 className="mb-5 text-center">MODIFICAR OPERACIÓN</h3>
            <Form.Group>
              <Form.Control
                ref={register({
                  required: {
                    value: true,
                    message: "La fecha es requerida",
                  },
                })}
                value={modifyDate}
                onChange={(e) => {
                  setModifyDate(e.target.value);
                }}
                name="date"
                placeholder="fecha"
                type="date"
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
                value={modifyConcept}
                name="concept"
                placeholder="concepto"
                type="text"
                onChange={(e) => {
                  setModifyConcept(e.target.value);
                }}
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
                value={modifyAmount}
                name="amount"
                placeholder="monto"
                onChange={(e) => {
                  setModifyAmount(e.target.value);
                }}
                type="number"
              />
            </Form.Group>
            {type === "INGRESO" ? (
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Control
                  as="select"
                  onChange={(e) => setModifyCategory(e.target.value)}
                >
                  <option value="" disabled defaultValue>
                    Categoria
                  </option>
                  <option value="FIJO">FIJO</option>
                  <option value="VARIABLE">VARIABLE</option>
                  <option value="EXTRAORDINARIO">EXTRAORDINARIO</option>
                </Form.Control>
              </Form.Group>
            ) : (
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Control
                  as="select"
                  onChange={(e) => setModifyCategory(e.target.value)}
                >
                  <option value="" disabled defaultValue>
                    Categoria
                  </option>
                  <option value="ALIMENTACION">ALIMENTACION</option>
                  <option value="CUENTA Y PAGOS">CUENTA Y PAGOS</option>
                  <option value="CASA">CASA</option>
                  <option value="TRANSPORTE">TRANSPORTE</option>
                  <option value="SALUD E HIGIENE">SALUD E HIGIENE</option>
                  <option value="DIVERSION">DIVERSION</option>
                  <option value="OTROS">OTROS</option>
                </Form.Control>
              </Form.Group>
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
                Modificar
              </Button>
            </div>
          </Form>
        </Wrapper>
      )}
      <h3 className="text-center mt-5 mb-5">{response}</h3>
    </div>
  );
}

export default Home;
