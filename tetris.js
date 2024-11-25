// Obtener el lienzo y el contexto
const canvas = document.getElementById("tetris");
const lienzo = canvas.getContext("2d");

// Constantes del tablero
const filas = 20;
const columnas = 10;
const tamanoCelda = 30;

// Inicializar tablero
const tablero = Array.from({ length: filas }, () => Array(columnas).fill(0)); // Inicializo el tablero con todas las celdas en 0

// Piezas disponibles
const piezas = [
  {
    nombre: "C",
    forma: [
      [1, 1, 1], // Forma de la pieza
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

function eliminarLinea() {
  for (let fila = 0; fila < filas; fila++) {
    //recorro las filas
    if (tablero[fila].every((celda) => celda === 1)) {
      //si todas las celdas de la fila tienen valor 1
      tablero.splice(fila, 1); //elimino la fila
      tablero.unshift(Array(columnas).fill(0)); //agrego una fila con todas las celdas en 0
    }
  }
}

function chequearColisiones(pieza, x, y) {
  //paso por parametro la pieza, la posicion x y la posicion y de la pieza
  for (let i = 0; i < pieza.forma.length; i++) {
    //recorro la pieza
    for (let j = 0; j < pieza.forma[i].length; j++) {
      //recorro la fila de la pieza
      if (
        pieza.forma[i][j] && //si la celda de la pieza tiene valor 1
        (x + j < 0 || //si la celda de la pieza esta fuera del tablero
          x + j >= columnas ||
          y + i >= filas ||
          tablero[y + i][x + j]) //si la celda de la pieza colisiona con otra celda del tablero
      ) {
        return true; //retorno true
      }
    }
  }
  return false; //si no hay colisiones retorno false
}

function posicionaPieza(pieza, x, y) {
  //paso por parametro la pieza, la posicion x y la posicion y de la pieza
  pieza.forma.forEach((fila, i) => {
    //recorro la pieza y obtengo la fila y la posicion i
    fila.forEach((celda, j) => {
      //recorro la fila y reviso si hay celda con valor 1
      if (celda) {
        //si hay celda con valor 1
        tablero[y + i][x + j] = 1; //actualizo el tablero con la posicion del x y y de la celda formando así iterativamente la pieza
      }
    });
  });
}

function actualizar() {
  if (chequearColisiones(piezaActual, posicion.x, posicion.y + 1)) {
    //si hay colisiones
    posicionaPieza(piezaActual, posicion.x, posicion.y); //posiciono la pieza
    eliminarLinea(); //elimino la linea
    piezaActual = generarPieza(); //genero una nueva pieza
    posicion = { x: Math.floor(columnas / 2) - 1, y: 0 }; //posiciono la pieza en el centro del tablero

    if (chequearColisiones(piezaActual, posicion.x, posicion.y)) {
      //si hay colisiones
      clearInterval(intervalo); //detengo el intervalo
      alert(
        //muestro un mensaje
        "FIN DE LA PARTIDA. Este juego ha sido desarrollado por José Rubén Arjona Jiménez."
      );
    }
  } else {
    posicion.y++;
  }
}

// Control de teclado
document.addEventListener("keydown", (event) => {
  //realmente no es especialmente util ese ||
  //escucho el evento keydown
  if (event.key === "a" || event.key === "A") {
    //si la tecla presionada es "a" o "A"
    if (!chequearColisiones(piezaActual, posicion.x - 1, posicion.y)) {
      //si no hay colisiones
      posicion.x--; //actualizo la posicion x
    }
  } else if (event.key === "d" || event.key === "D") {
    //si la tecla presionada es "d" o "D"
    if (!chequearColisiones(piezaActual, posicion.x + 1, posicion.y)) {
      //si no hay colisiones
      posicion.x++; //actualizo la posicion x
    }
  } else if (event.key === "s" || event.key === "S") {
    //si la tecla presionada es "s" o "S"
    if (!chequearColisiones(piezaActual, posicion.x, posicion.y + 1)) {
      //si no hay colisiones
      posicion.y++; //actualizo la posicion y
    }
  }
  dibujarTablero();
  dibujarPieza(piezaActual, posicion.x, posicion.y);
});

// Jugar Tetris
function jugar() {
  //funcion jugar
  actualizar(); //llamo a la funcion actualizar
  dibujarTablero(); //llamo a la funcion dibujarTablero para dibujar el tablero
  dibujarPieza(piezaActual, posicion.x, posicion.y); //llamo a la funcion dibujarPieza para dibujar la pieza actual
}

setInterval(jugar, 500);
