const canvas = document.getElementById("tetris");
const lienzo = canvas.getContext("2d");

// Constantes del tablero
const filas = 20;
const columnas = 10;
const tamanoCelda = 30;

// Inicializar tablero
const tablero = Array.from({ length: filas }, () => Array(columnas).fill(0)); // Inicializo el tablero con todas las celdas en 0

function dibujarTablero() {
  for (let fila = 0; fila < filas; fila++) {
    //recorro las filas
    for (let columna = 0; columna < columnas; columna++) {
      //recorro las columnas
      // selecciono el color basado en el valor de la celda
      lienzo.fillStyle = tablero[fila][columna] === 1 ? "gray" : "black";
      // Dibuja la celda
      lienzo.fillRect(
        columna * tamanoCelda, // Posición en X
        fila * tamanoCelda, // Posición en Y
        tamanoCelda, // Ancho de la celda
        tamanoCelda // Alto de la celda
      );
      // Dibuja el borde de la celda para mayor claridad a la hora de jugar
      lienzo.strokeStyle = "#CCCCCC"; // Gris claro
      lienzo.strokeRect(
        columna * tamanoCelda,
        fila * tamanoCelda,
        tamanoCelda,
        tamanoCelda
      );
    }
  }
}
