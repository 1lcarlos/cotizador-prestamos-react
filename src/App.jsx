import { useState, useEffect } from "react";
import Header from "./components/Header";
import Button from "./components/Button";
import { formatearDinero, calcularTotalPagar } from "./Helpers";
function App() {
  const [cantidad, setCantidad] = useState(2500000);
  const [meses, setMeses] = useState(6);
  const [total, setTotal] = useState(0);
  const [mensualidad, setMensualidad] = useState(0);

  useEffect(() => {
    const resultadoTotalPagar = calcularTotalPagar(cantidad, meses);
    setTotal(resultadoTotalPagar);
  }, [cantidad, meses]);
  // Calculo de Mensualidades
  useEffect(() => {
    setMensualidad(total / meses);
  }, [total]);

  const min = 100000;
  const max = 5000000;
  const step = 100000;
  function handleChange(e) {
    setCantidad(Number(e.target.value));
  }
  function handleClickDecremento() {
    const valor = cantidad - step;
    if (valor < min) {
      alert("Cantidad no disponible para prestamo");
      return;
    }
    setCantidad(valor);
  }
  function handleClickAumento() {
    const valor = cantidad + step;
    if (valor > max) {
      alert("Cantidad no disponible para prestamo");
      return;
    }
    setCantidad(valor);
  }
  return (
    <>
      <div className=" my-20 max-w-lg mx-auto bg-white shadow p-10">
        <Header />
        <div className=" flex justify-between my-4">
          <Button operador="-" fn={handleClickDecremento} />
          <Button operador="+" fn={handleClickAumento} />
        </div>

        <input
          type="range"
          className=" mt-5 w-full h-6 bg-gray-200 accent-lime-500 hover:accent-lime-600"
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          value={cantidad}
        />
        <p className=" text-center my-10 text-5xl font-extrabold text-indigo-600">
          {formatearDinero(cantidad)}
        </p>
        <h2 className=" text-2xl font-extrabold text-gray-500 text-center">
          {" "}
          Elije un <span className=" text-indigo-600">Plazo</span> para pagar{" "}
        </h2>
        <select
          name=""
          id=""
          className="mt-5 w-full p-2 bg-white border border-gray-300 rounded-lg text-center text-xl font-bold text-gray-500"
          value={meses}
          onChange={(e) => setMeses(Number(e.target.value))}
        >
          <option value="6">6 Meses</option>
          <option value="12">12 Meses</option>
          <option value="24">24 Meses</option>
        </select>
        <div className=" my-5 space-y-3 bg-gray-50 p-5">
          <h2 className=" text-2xl font-extrabold text-gray-500 text-center">
            Resumen <span className=" text-indigo-600">de Pagos</span>{" "}
          </h2>
          <p className=" text-xl text-gray-500 text-center font-bold">
            {" "}
            {meses} Meses
          </p>
          <p className=" text-xl text-gray-500 text-center font-bold">
            {" "}
            {formatearDinero(total)} Total a pagar
          </p>
          <p className=" text-xl text-gray-500 text-center font-bold">
            {" "}
            {formatearDinero(mensualidad)} Mensuales
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
