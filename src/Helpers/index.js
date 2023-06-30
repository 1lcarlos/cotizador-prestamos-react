const formatearDinero = (valor) => {
  const formatoColombiano = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  });
  return formatoColombiano.format(valor);
};

const calcularTotalPagar = (cantidad, plazo) => {
  let total;
  //mientras mayyor la cantidad dolicitada el interes sera menor
  if (cantidad < 1000000) {
    total = cantidad * 1.5;
  } else if (cantidad >= 1000000 && cantidad < 2500000) {
    total = cantidad * 1.4;
  } else if (cantidad >= 2500000 && cantidad < 3500000) {
    total = cantidad * 1.3;
  } else {
    total = cantidad * 1.2;
  }
  //Mayor plazo mas interes
  if (plazo === 6) {
    total *= 1.1;
  } else if (plazo === 12) {
    total *= 1.2;
  } else {
    total *= 1.3;
  }
  return total;
};

export { formatearDinero, calcularTotalPagar };
