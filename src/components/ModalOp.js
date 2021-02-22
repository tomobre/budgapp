import React from "react";
import axios from "axios";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { ModifyOpContext } from "../context/ModifyOpContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
Modal.setAppElement("#root");

const modalStyles = {
  content: {
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
  },
  button: {
    backgroundColor: "transparent",
    border: "none",
    position: "absolute",
    right: "4%",
    top: "2%",
  },
};

function ModalOp() {
  const {
    modifyOkKey,
    responseModifiedKey,
    modalKey,
    modifyConceptKey,
    modifyAmountKey,
    modifyDateKey,
    typeKey,
    modifyCategoryKey,
  } = React.useContext(ModifyOpContext);

  const [modifyOk, setModifyOk] = modifyOkKey;
  // eslint-disable-next-line no-unused-vars
  const [responseModified, setResponseModified] = responseModifiedKey;
  const [modifyConcept, setModifyConcept] = modifyConceptKey;
  const [modifyAmount, setModifyAmount] = modifyAmountKey;
  const [modifyDate, setModifyDate] = modifyDateKey;
  // eslint-disable-next-line no-unused-vars
  const [type, setType] = typeKey;
  const [modifyCategory, setModifyCategory] = modifyCategoryKey;
  const [modal, setModal] = modalKey;

  const { register, handleSubmit, errors } = useForm();

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

  return (
    <Modal
      onRequestClose={() => {
        setModal(false);
      }}
      style={modalStyles}
      isOpen={modal}
    >
      <button style={modalStyles.button} onClick={() => setModal(false)}>
        x
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
            <Form.Group>
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
            <Form.Group>
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
  );
}

export default ModalOp;
