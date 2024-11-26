// Piezas disponibles
const piezas = [
  {
    nombre: "C",
    forma: [
      [1, 1, 1], // Forma de la pieza
      [1, 0, 1],
    ],
    probabilidad: 0.05, // 5%
    color: "#FF00FF", // Neon Magenta
  },
  {
    nombre: "I",
    forma: [[1, 1, 1, 1]],
    probabilidad: 0.1, // 10%
    color: "#00FFFF", // Neon Cyan
  },
  {
    nombre: "O",
    forma: [
      [1, 1],
      [1, 1],
    ],
    probabilidad: 0.1, // 10%
    color: "#FFFF00", // Neon Yellow
  },
  {
    nombre: "T",
    forma: [
      [1, 1, 1],
      [0, 1, 0],
    ],
    probabilidad: 0.175, // 17.5%
    color: "#FF00FF", // Neon Magenta
  },
  {
    nombre: "L",
    forma: [
      [1, 1, 1],
      [1, 0, 0],
    ],
    probabilidad: 0.175, // 17.5%
    color: "#FF4500", // Neon Orange-Red
  },
  {
    nombre: "J",
    forma: [
      [1, 1, 1],
      [0, 0, 1],
    ],
    probabilidad: 0.175, // 17.5%
    color: "#FF69B4", // Neon Pink
  },
  {
    nombre: "Z",
    forma: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    probabilidad: 0.125, // 12.5%
    color: "#00FF00", // Neon Green
  },
  {
    nombre: "S",
    forma: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    probabilidad: 0.125, // 12.5%
    color: "#32CD32", // Neon Lime
  },
];

function dibujarPieza(pieza, x, y) {
  pieza.forma.forEach((fila, i) => {
    //recorro la pieza y obtengo la fila y la posicion i
    fila.forEach((celda, j) => {
      //recorro la fila y reviso si hay celda con valor 1
      if (celda) {
        //si hay celda con valor 1 pinto la celda
        lienzo.fillStyle = pieza.color;
        lienzo.fillRect(
          (j + x) * tamanoCelda, // Posición en X
          (i + y) * tamanoCelda, // Posición en Y
          tamanoCelda,
          tamanoCelda
        );
      }
    });
  });
}

function generarPieza() {
  const random = Math.random(); //genero un numero aleatorio entre 0 y 1
  let acumulado = 0; //inicializo la variable acumulado en 0
  for (const pieza of piezas) {
    //recorro las piezas
    acumulado += pieza.probabilidad; //sumo la probabilidad de la pieza actual a la variable acumulado
    if (random < acumulado) {
      //si el numero aleatorio es menor a la probabilidad acumulada
      return pieza; //retorno la pieza
    }
  }
}

// Variables globales para la pieza actual y su posición
let piezaActual = generarPieza(); //genero una pieza
let posicion = { x: Math.floor(columnas / 2) - 1, y: 0 }; //posiciono la pieza en el centro del tablero

function rotarPieza(pieza) {
  //paso por parametro la pieza
  const nuevaForma = []; //inicializo un array vacio
  for (let i = 0; i < pieza.forma[0].length; i++) {
    //recorro la pieza
    nuevaForma.push(pieza.forma.map((fila) => fila[i]).reverse()); //roto la pieza
  }
  //retorno la pieza rotada, los tres puntos es un spread operator que se utiliza para copiar los valores de un objeto menos las propiedades que se quieren cambiar
  return { ...pieza, forma: nuevaForma };
}
