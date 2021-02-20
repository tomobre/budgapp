import React from "react";
import styled from "styled-components/macro";

const Wrapper = styled.div`
  background-color: white;
  border-radius: 0.375rem;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.15);
  padding: 3rem;
  margin-bottom: 2rem;
`;

function Categories() {
  return (
    <Wrapper>
      <h3 className="mb-5 text-center"> ¿Que significa cada categoria?</h3>
      <p>Los ingresos los podemos dividir en tres categorías:</p>

      <ul>
        <li>
          Ingresos fijos: son aquellos que recibimos de forma regular, como son:
          las nóminas, los subsidios, las pensiones, alquileres. Los ingresos
          fijos son muy fáciles de controlar, pues lo normal es recibirlos en
          nuestra cuenta bancaria, por lo que nos será muy fácil de consultar en
          cualquier momento.
        </li>
        <li>
          Ingresos variables: son aquellos que no son recurrentes de forma
          periódica, como por ejemplo: si cobramos incentivos o comisiones por
          ventas, facturas emitidas en caso de autónomos o si realizamos
          trabajos puntuales.
        </li>
        <li>
          Ingresos extraordinarios: son aquellos que no estaban previstos y que
          ocurren de forma extraordinaria, como por ejemplo el cobro de una
          herencia o un boleto premiado de lotería.
        </li>
      </ul>
      <br />
      <p>
        Por otro lado tenemos los egresos, es decir los gastos que se van a
        generar de manera periodica. Entre estos encontramos:
      </p>

      <ul>
        <li>Alimentación. </li>
        <li>
          Cuentas y pagos: los gastos de energía, teléfono, Internet, agua.
        </li>
        <li>Casa: alquiler, reparaciones.</li>
        <li>Transporte: gastos para el coche, combustible, taxi.</li>
        <li>
          Salud e higiene: medicamentos, cosméticos, productos de limpieza.
        </li>
        <li>Diversión: cine, teatro, gimnasio, pasatiempo, libros, etc.</li>
        <li>
          Otros gastos: los gastos que no encajan en ninguna de las categorías
          anteriores.
        </li>
      </ul>
      <hr className="mt-5" />
      <p className="text-muted font-italic">Fuentes:</p>
      <p className=" text-muted font-italic">
        https://aprendizfinanciero.com/como-categorizar-tus-gastos/
      </p>
      <p className="text-muted font-italic">
        https://www.inbestme.com/blog/el-presupuesto-ingresos/
      </p>
    </Wrapper>
  );
}

export default Categories;
