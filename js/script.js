// script.js

// Constantes y variables
const MESES = 12;
let ahorroMensual;
let totalAhorro = 0;
const historialAhorro = []; // array para registrar cada mes

// Función: Solicitar ahorro mensual (Entrada)
function solicitarAhorro() {
  ahorroMensual = parseFloat(
    prompt("Ingrese cuánto desea ahorrar cada mes (solo números):")
  );
  if (isNaN(ahorroMensual) || ahorroMensual <= 0) {
    alert("Por favor ingrese un valor válido mayor a 0.");
    solicitarAhorro();
  } else {
    console.log(
      "Valor de ahorro mensual ingresado correctamente:",
      ahorroMensual
    );
  }
}

// Función: Calcular ahorro total con bucle for y registrar en array (Procesamiento)
function calcularAhorroTotal() {
  totalAhorro = 0;
  historialAhorro.length = 0; // limpiar array si ya fue utilizado antes
  for (let i = 1; i <= MESES; i++) {
    totalAhorro += ahorroMensual;
    historialAhorro.push(totalAhorro);
    console.log(`Mes ${i}: ahorro acumulado $${totalAhorro}`);
  }
}

// Función: Mostrar resultado con confirm y alert (Salida)
function mostrarResultado() {
  let mensaje = "Resumen de ahorro por mes:\n";
  historialAhorro.forEach((valor, index) => {
    mensaje += `Mes ${index + 1}: $${valor}\n`;
  });
  mensaje += `\nTotal ahorrado al final del año: $${totalAhorro}`;

  let confirmar = confirm("¿Desea ver el detalle de su ahorro mensual?");
  if (confirmar) {
    alert(mensaje);
  } else {
    alert(`Total ahorrado al final del año: $${totalAhorro}`);
  }
}

// Invocación ordenada de funciones
solicitarAhorro();
calcularAhorroTotal();
mostrarResultado();

console.log("Simulador finalizado correctamente.");
