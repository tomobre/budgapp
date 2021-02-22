import React, { useContext } from "react";
import axios from "axios";
import { ModifyOpContext } from "../context/ModifyOpContext";
import ModalOp from "./ModalOp";
import styled from "styled-components/macro";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

const Total = styled.td`
  font-weight: 700;
`;

const Img = styled.img`
  cursor: pointer;
`;

function Home() {
  const {
    modifyOkKey,
    responseModifiedKey,
    modalKey,
    modifyConceptKey,
    modifyAmountKey,
    modifyDateKey,
    typeKey,
    modifyCategoryKey,
  } = useContext(ModifyOpContext);

  const [modifyOk, setModifyOk] = modifyOkKey;
  const [responseModified, setResponseModified] = responseModifiedKey;
  // eslint-disable-next-line no-unused-vars
  const [concept, setModifyConcept] = modifyConceptKey;
  // eslint-disable-next-line no-unused-vars
  const [amount, setModifyAmount] = modifyAmountKey;
  // eslint-disable-next-line no-unused-vars
  const [date, setModifyDate] = modifyDateKey;
  // eslint-disable-next-line no-unused-vars
  const [type, setType] = typeKey;
  // eslint-disable-next-line no-unused-vars
  const [category, setModifyCategory] = modifyCategoryKey;
  const [modal, setModal] = modalKey;

  const [data, setData] = React.useState([]);
  const [totalCount, setTotalCount] = React.useState(0);
  const [filterCategory, setFilterCategory] = React.useState("TODAS");
  const [visible, setVisible] = React.useState({ beg: 0, end: 10 });
  const [responseData, setResponseData] = React.useState({
    state: true,
    message: "Cargando...",
  });

  React.useEffect(() => {
    const checkToken = localStorage.getItem("token");
    let mounted = true;
    if (checkToken) {
      axios
        .get("https://budgapp-back.herokuapp.com/user/auth", {
          headers: { "x-access-token": localStorage.getItem("token") },
        })
        .then((res) => {
          let user = localStorage.getItem("user");
          axios
            .get(`https://budgapp-back.herokuapp.com/operations/${user}`)
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
                  if (mounted) {
                    setTimeout(() => {
                      setResponseData({
                        state: true,
                        message:
                          "No hay operaciones registradas con el usuario",
                      });
                    }, 5000);
                  }
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
      .get(`https://budgapp-back.herokuapp.com/operations/user/${e.target.id}`)
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
        .delete(`https://budgapp-back.herokuapp.com/delete/${e.target.id}`)
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
                      <td>
                        {new Date(info.date).toLocaleDateString("es-AR", {
                          timeZone: "UTC",
                        })}
                      </td>
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
        {modal && modifyOk.message === "" && <ModalOp></ModalOp>}
      </div>
    );
  }
}

export default Home;
