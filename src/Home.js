import React from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styled from "styled-components/macro";
import Modal from "react-modal";
Modal.setAppElement("#root");

const Total = styled.td`
  font-weight: 700;
`;

const Img = styled.img`
  cursor: pointer;
`;

const modalStyles = {
  content: {
    backgroundColor: "white",
    borderRadius: "0.375rem",
    boxShadow: "0 5px 10px 0 rgba(0, 0, 0, 0.15)",
    padding: "3rem",
    marginBottom: "3rem",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    marginLeft: "2vw",
    marginRightt: "2vh",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backdropFilter: "blur(2px)",
    transition: "all 2000ms ease",
  },
  button: {
    backgroundColor: "transparent",
    border: "none",
    position: "absolute",
    right: "4%",
    top: "2%",
  },
};

function Home() {
  const [modal, setModal] = React.useState(false);

  const [data, setData] = React.useState([]);
  const [modifyOk, setModifyOk] = React.useState({
    id: "",
    message: "",
  });
  const [modifyConcept, setModifyConcept] = React.useState("");
  const [modifyAmount, setModifyAmount] = React.useState("");
  const [modifyDate, setModifyDate] = React.useState("");
  const [totalCount, setTotalCount] = React.useState(0);
  const [type, setType] = React.useState("");
  const [modifyCategory, setModifyCategory] = React.useState("");
  const [filterCategory, setFilterCategory] = React.useState("TODAS");
  const [visible, setVisible] = React.useState({ beg: 0, end: 10 });
  const [responseData, setResponseData] = React.useState({
    state: true,
    message: "Cargando...",
  });
  const [responseModified, setResponseModified] = React.useState("");

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
          let user = localStorage.getItem("user");

          axios
            .get(`http://localhost:4000/operations/${user}`)
            .then((info) => {
              if (mounted) {
                setData(info.data);
                if (data.length) {
                  setResponseData({ state: false, message: "" });

                  let filterIng = data.filter((el) => {
                    return el.type === "INGRESO";
                  });
                  let filterEgr = data.filter((el) => {
                    return el.type === "EGRESO";
                  });

                  if (filterIng.length && filterEgr.length) {
                    let sumIng = filterIng.reduce((prev, next) => {
                      return { amount: prev.amount + next.amount };
                    });
                    let sumEgr = filterEgr.reduce((prev, next) => {
                      return { amount: prev.amount + next.amount };
                    });
                    setTotalCount(sumIng.amount - sumEgr.amount);
                  } else if (filterIng.length) {
                    let sumIng = filterIng.reduce((prev, next) => {
                      return { amount: prev.amount + next.amount };
                    });
                    setTotalCount(sumIng.amount);
                  } else if (filterEgr.length) {
                    let sumEgr = filterEgr.reduce((prev, next) => {
                      return { amount: prev.amount + next.amount };
                    });
                    setTotalCount(0 - sumEgr.amount);
                  }
                } else {
                  setTimeout(() => {
                    if (mounted) {
                      setResponseData({
                        state: true,
                        message:
                          "No hay operaciones registradas con el usuario",
                      });
                    }
                  }, 5000);
                }
              }
            })
            .catch((err) => {
              setResponseData({
                state: true,
                message: `Ocurrio un error ${
                  err.response ? err.response.status : 503
                } al traer la informacion: ${
                  err.response ? err.response.data : err
                }`,
              });
            });
        })
        .catch((err) => {
          function reloadPage() {
            let currentDocumentTimestamp = new Date(
              performance.timing.domLoading
            ).getTime();

            let now = Date.now();

            let tenSec = 10 * 1000;
            let plusTenSec = currentDocumentTimestamp + tenSec;
            if (now > plusTenSec) {
              window.location.reload();
            }
          }
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          setResponseData({
            state: true,
            message: `Ocurrio un error ${
              err.response ? err.response.status : 503
            } con la cuenta del usuario: ${
              err.response ? err.response.data : err
            }`,
          });
          reloadPage();
        });
    } else {
      setResponseData({
        state: true,
        message:
          "Budg App es una plataforma para manejar sus propios ingresos o egresos economicos. Registrese o ingrese para comenzar con su uso.",
      });
    }
    return function cleanup() {
      mounted = false;
    };
  }, [data, totalCount]);

  const handleModif = (e) => {
    setModal(true);
    setModifyOk({ id: e.target.id, message: "Cargando..." });
    axios
      .get(`http://localhost:4000/operations/user/${e.target.id}`)
      .then((res) => {
        setModifyOk({ id: e.target.id, message: "" });
        setModifyConcept(res.data[0].concept);
        setModifyAmount(res.data[0].amount);
        setModifyDate(res.data[0].date.slice(0, 10));
        setType(res.data[0].type);
        setModifyCategory(res.data[0].category);
      })
      .catch((err) => {
        setModifyOk({
          id: e.target.id,
          message: `Ocurrio un error ${
            err.response ? err.response.status : 503
          } al cargar el contenido: ${err.response ? err.response.data : err}`,
        });

        setTimeout(() => {
          setModifyOk({
            id: "",
            message: ``,
          });
        }, 5000);
      });
  };

  const onSubmit = (e) => {
    setModifyOk({ id: "", message: "" });
    setModal(false);
    let updateData = {
      concept: modifyConcept,
      amount: parseInt(modifyAmount, 10),
      date: modifyDate,
      category: modifyCategory,
    };

    axios
      .put(
        `http://localhost:4000/update/${parseInt(modifyOk.id, 10)}`,
        updateData
      )
      .then(() => {
        setResponseModified("Se ha modificado la operacion con exito");

        setTimeout(() => {
          setResponseModified("");
        }, 5000);
      })
      .catch((err) => {
        setResponseModified(
          `Hubo un error ${
            err.response.status ? err.response.status : 503
          } al modificar la operacion: ${
            err.response.data[0].msg
              ? err.response.data[0].msg
              : err.response
              ? err.response.data
              : err
          } `
        );

        setTimeout(() => {
          setResponseModified("");
        }, 5000);
      });
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(onSubmit)();
    }
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
          setResponseModified(`Se eliminó la operacion con exito`);

          setTimeout(() => {
            setResponseModified("");
          }, 5000);
        })
        .catch((err) => {
          console.log(err);
          setResponseModified(
            `Hubo un error ${
              err.response.status ? err.response.status : 503
            } al intentar eliminar la operacion: ${
              err.response ? err.response.data : err
            } `
          );

          setTimeout(() => {
            setResponseModified("");
          }, 5000);
        });
    }
  };

  if (responseData.state) {
    return <p className="text-center mt-5 mb-5">{responseData.message}</p>;
  } else {
    return (
      <div>
        <h3 className="text-center mt-5 mb-5">{responseModified}</h3>
        <h3 className="text-center mt-5 mb-5">{modifyOk.message}</h3>
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
                  onChange={(e) => {
                    setFilterCategory(e.target.value);
                    setVisible({ beg: 0, end: 10 });
                  }}
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
                      <td>{info.amount.toLocaleString("es")} $</td>
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
              <Total>{totalCount.toLocaleString("es")} $</Total>
            </tr>
          </tbody>
        </Table>
        <div className="d-flex flex-row justify-content-center mt-1 mb-4">
          {visible.beg > 0 && (
            <div className="mx-2 ">
              <Img
                alt="previous"
                src="https://icongr.am/jam/chevrons-circle-left-f.svg?size=30&color=699dfb"
                onClick={loadBack}
              ></Img>
            </div>
          )}
          {visible.end <
            data.filter((op) => {
              if (filterCategory === "TODAS") {
                return op.category;
              } else {
                return op.category === filterCategory;
              }
            }).length && (
            <div>
              <Img
                alt="next"
                src="https://icongr.am/jam/chevrons-circle-right-f.svg?size=30&color=699dfb"
                onClick={loadMore}
              ></Img>
            </div>
          )}
        </div>

        {modal && modifyOk.message === "" && (
          <Modal
            closeTimeoutMS={2000}
            onRequestClose={() => {
              setModal(false);
            }}
            style={modalStyles}
            isOpen={modal}
          >
            <button style={modalStyles.button} onClick={() => setModal(false)}>
              X
            </button>
            <Form onKeyUp={handleKeyUp}>
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
                      message:
                        "El concepto no debe tener  más de 50 caracteres",
                    },
                    minLength: {
                      value: 4,
                      message:
                        "El concepto debe tener como minimo  4 caracteres",
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
                    max: {
                      value: 1000000,
                      message: "Monto mayor a un millon no valido",
                    },
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
                <div key="1813">
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Control
                      as="select"
                      onChange={(e) => setModifyCategory(e.target.value)}
                    >
                      <option defaultValue value={modifyCategory}>
                        {modifyCategory}
                      </option>
                      <option value="FIJO">FIJO</option>
                      <option value="VARIABLE">VARIABLE</option>
                      <option value="EXTRAORDINARIO">EXTRAORDINARIO</option>
                    </Form.Control>
                  </Form.Group>
                </div>
              ) : (
                <div key="1513">
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Control
                      as="select"
                      name="category"
                      onChange={(e) => setModifyCategory(e.target.value)}
                    >
                      <option defaultValue value={modifyCategory}>
                        {modifyCategory}
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
                  Modificar
                </Button>
              </div>
            </Form>
          </Modal>
        )}
      </div>
    );
  }
}

export default Home;
