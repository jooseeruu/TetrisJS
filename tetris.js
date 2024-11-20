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
    probabilidad: 0.3,
    color: "red",
  },

  {
    nombre: "I",
    forma: [[1, 1, 1, 1]],
    probabilidad: 0.1,
    color: "blue",
  },
  {
    nombre: "L",
    forma: [
      [1, 1, 1],
      [1, 0, 0],
    ],
    probabilidad: 0.1,
    color: "orange",
  },
  {
    nombre: "J",
    forma: [
      [1, 1, 1],
      [0, 0, 1],
    ],
    probabilidad: 0.1,
    color: "pink",
  },
  {
    nombre: "O",
    forma: [
      [1, 1],
      [1, 1],
    ],
    probabilidad: 0.2,
    color: "yellow",
  },
  {
    nombre: "T",
    forma: [
      [1, 1, 1],
      [0, 1, 0],
    ],
    probabilidad: 0.1,
    color: "purple",
  },
  {
    nombre: "Z",
    forma: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    probabilidad: 0.1,
    color: "cyan",
  },
  {
    nombre: "S",
    forma: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    probabilidad: 0.1,
    color: "green",
  },
];
