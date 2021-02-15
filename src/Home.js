import React from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Home() {
  const [data, setData] = React.useState([]);
  const [modifyOk, setModifyOk] = React.useState({ state: false, id: "" });
  const [modifyConcept, setModifyConcept] = React.useState("");
  const [modifyAmount, setModifyAmount] = React.useState("");
  const [modifyDate, setModifyDate] = React.useState("");
  const [totalCount, setTotalCount] = React.useState(0);
  const { register, handleSubmit, errors } = useForm();

  React.useEffect(() => {
    let mounted = true;
    axios
      .get("http://localhost:4000/operations")
      .then((info) => {
        if (mounted) {
          setData(info.data);

          let sumIng = data
            .filter((el) => {
              return el.tipo === "INGRESO";
            })
            .reduce((prev, next) => {
              return { monto: prev.monto + next.monto };
            });

          let sumEgr = data
            .filter((el) => {
              return el.tipo === "EGRESO";
            })
            .reduce((prev, next) => {
              return { monto: prev.monto + next.monto };
            });

          setTotalCount(sumIng.monto - sumEgr.monto);
        }
      })
      .catch((err) => console.log(err));

    return function cleanup() {
      mounted = false;
    };
  }, [data]);

  const handleModif = (e) => {
    axios
      .get(`http://localhost:4000/operations/${e.target.id}`)
      .then((res) => {
        console.log(res.data);
        setModifyOk({ state: true, id: e.target.id });
        setModifyConcept(res.data[0].concepto);
        setModifyAmount(res.data[0].monto);
        setModifyDate(res.data[0].date);
      })
      .catch((err) => console.log(err));
  };

  const onSubmit = () => {
    let updateData = {
      concepto: modifyConcept,
      monto: parseInt(modifyAmount, 10),
      date: modifyDate,
    };
    console.log(updateData);

    axios
      .put(
        `http://localhost:4000/update/${parseInt(modifyOk.id, 10)}`,
        updateData
      )
      .then(() => console.log("modified"))
      .catch((err) => console.log(err));
  };

  const handleDelete = (e) => {
    axios
      .delete(`http://localhost:4000/delete/${e.target.id}`)
      .then(() => {
        console.log("deleted");
      })
      .catch(console.log("error"));
  };

  return (
    <div>
      <Table className="mb-5" responsive striped bordered hover>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Concepto</th>
            <th>Tipo</th>
            <th>Monto</th>
          </tr>
        </thead>
        <tbody>
          {data.map((info) => {
            return (
              <tr key={info.id}>
                <td>{info.date}</td>
                <td>{info.concepto}</td>
                <td>{info.tipo}</td>
                <td>{info.monto} $</td>
                <td>
                  <img
                    className="mr-3"
                    id={info.id}
                    alt="Modificar"
                    onClick={handleModif}
                    src="https://icongr.am/entypo/new-message.svg?size=25&color=0038e0"
                  ></img>

                  <img
                    id={info.id}
                    alt="Eliminar"
                    onClick={handleDelete}
                    src="https://icongr.am/jam/trash-alt.svg?size=26&color=ff0000"
                  ></img>
                </td>
              </tr>
            );
          })}
          <tr>
            <td colSpan="2"></td>
            <td>TOTAL</td>
            <td>{totalCount} $</td>
          </tr>
        </tbody>
      </Table>

      {modifyOk.state && (
        <Form>
          <h2 className="mb-5">MODIFICAR OPERACION</h2>
          <Form.Group>
            <Form.Control
              value={modifyDate}
              onChange={(e) => {
                setModifyDate(e.target.value);
              }}
              name="date"
              placeholder="fecha"
              type="text"
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              ref={register({
                required: {
                  value: true,
                  message: "El concepto de la operacion  es obligatoria",
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
                min: { value: 0, message: "Monto no valido" },
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
          <span className="text-danger text-small d-block mb-2">
            {errors.amount && errors.amount.message}
          </span>
          <span className="text-danger text-small d-block mb-2">
            {errors.concept && errors.concept.message}
          </span>
          <Button onClick={handleSubmit(onSubmit)} variant="primary">
            Modificar
          </Button>
        </Form>
      )}
    </div>
  );
}

export default Home;
