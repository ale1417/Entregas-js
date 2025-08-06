const MESES = 12;
const form = document.getElementById("formAhorro");
const input = document.getElementById("inputAhorro");
const resultadoDiv = document.getElementById("resultado");
const btnHistorial = document.getElementById("btnHistorial");
const btnLimpiar = document.getElementById("btnLimpiar");

function calcularAhorro(ahorroMensual) {
  const historial = [];
  let total = 0;

  for (let i = 1; i <= MESES; i++) {
    total += ahorroMensual;
    historial.push({ mes: i, ahorro: total });
  }

  localStorage.setItem("historialAhorro", JSON.stringify(historial));
  mostrarResultado(historial, total);
}

function mostrarResultado(historial, total) {
  resultadoDiv.classList.remove("d-none");
  resultadoDiv.innerHTML = `<strong>Total ahorrado al final del año:</strong> $${total}<br/><br/>`;

  historial.forEach(item => {
    resultadoDiv.innerHTML += `Mes ${item.mes}: $${item.ahorro}<br/>`;
  });
}

function mostrarHistorialGuardado() {
  resultadoDiv.classList.remove("d-none");

  const data = localStorage.getItem("historialAhorro");

  if (!data) {
    resultadoDiv.innerHTML = "ℹ️ No hay historial guardado.";
    return;
  }

  let historial;
  try {
    historial = JSON.parse(data);
  } catch (e) {
    resultadoDiv.innerHTML = "❌ Error al leer el historial guardado.";
    return;
  }

  if (!Array.isArray(historial) || historial.length === 0) {
    resultadoDiv.innerHTML = "⚠️ El historial está vacío.";
    return;
  }

  let total = historial[historial.length - 1].ahorro;

  resultadoDiv.innerHTML = `<strong>Historial recuperado desde localStorage:</strong><br/><br/>`;
  historial.forEach((item) => {
    resultadoDiv.innerHTML += `Mes ${item.mes}: $${item.ahorro}<br/>`;
  });
  resultadoDiv.innerHTML += `<br/><strong>Total:</strong> $${total}`;
}

function limpiarHistorial() {
  localStorage.removeItem("historialAhorro");

  const verificacion = localStorage.getItem("historialAhorro");
  resultadoDiv.classList.remove("d-none");

  if (!verificacion) {
    resultadoDiv.innerHTML = "✅ Historial eliminado correctamente.";
  } else {
    resultadoDiv.innerHTML = "⚠️ Error al intentar eliminar el historial.";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const valor = parseFloat(input.value);

  if (isNaN(valor) || valor <= 0) {
    resultadoDiv.classList.remove("d-none");
    resultadoDiv.innerHTML = "Por favor, ingresá un número válido mayor a 0.";
    return;
  }

  calcularAhorro(valor);
});

btnHistorial.addEventListener("click", mostrarHistorialGuardado);
btnLimpiar.addEventListener("click", limpiarHistorial);
