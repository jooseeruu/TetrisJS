// Obtener el lienzo y el contexto
const canvas = document.getElementById("tetris");
const lienzo = canvas.getContext("2d");

// Constantes del tablero
const filas = 20;
const columnas = 10;
const tamanoCelda = 30;

// Inicializar tablero
const tablero = Array.from({ length: filas }, () => Array(columnas).fill(0));

// Piezas disponibles
const piezas = [
  {
    nombre: "C",
    forma: [
      [1, 1, 1],
      [1, 0, 1],
    ],
    probabilidad: 0.05, // 5%
    color: "#F4A3A3", // Pastel red
  },
  {
    nombre: "I",
    forma: [[1, 1, 1, 1]],
    probabilidad: 0.1, // 10%
    color: "#A3C9F4", // Pastel blue
  },
  {
    nombre: "O",
    forma: [
      [1, 1],
      [1, 1],
    ],
    probabilidad: 0.1, // 10%
    color: "#FFF1A3", // Pastel yellow
  },
  {
    nombre: "T",
    forma: [
      [1, 1, 1],
      [0, 1, 0],
    ],
    probabilidad: 0.175, // 17.5%
    color: "#D7A3F4", // Pastel purple
  },
  {
    nombre: "L",
    forma: [
      [1, 1, 1],
      [1, 0, 0],
    ],
    probabilidad: 0.175, // 17.5%
    color: "#F4C6A3", // Pastel orange
  },
  {
    nombre: "J",
    forma: [
      [1, 1, 1],
      [0, 0, 1],
    ],
    probabilidad: 0.175, // 17.5%
    color: "#F4A3E4", // Pastel pink
  },
  {
    nombre: "Z",
    forma: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    probabilidad: 0.125, // 12.5%
    color: "#A3F4F1", // Pastel cyan
  },
  {
    nombre: "S",
    forma: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    probabilidad: 0.125, // 12.5%
    color: "#A3F4A8", // Pastel green
  },
];

function dibujarTablero() {
  for (let fila = 0; fila < filas; fila++) {
    for (let columna = 0; columna < columnas; columna++) {
      // Selecciona el color basado en el valor de la celda
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
dibujarTablero(); // Dibujar tablero inicial quizás no sea necesario en un futuro

function dibujarPieza(pieza, x, y) {
  pieza.forma.forEach((fila, i) => {
    fila.forEach((celda, j) => {
      if (celda) {
        lienzo.fillStyle = pieza.color;
        lienzo.fillRect(
          (j + x) * tamanoCelda,
          (i + y) * tamanoCelda,
          tamanoCelda,
          tamanoCelda
        );
      }
    });
  });
}

function generarPieza() {
  const random = Math.random();
  let acumulado = 0;
  for (const pieza of piezas) {
    acumulado += pieza.probabilidad;
    if (random < acumulado) {
      return pieza;
    }
  }
}
dibujarPieza(generarPieza(), 0, 0); // Generar pieza inicial quizás no sea necesario en un futuro
