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
  let lineasEliminadas = 0; //inicializo la variable lineasEliminadas en 0
  for (let fila = 0; fila < filas; fila++) {
    //recorro las filas
    if (tablero[fila].every((celda) => celda === 1)) {
      //si todas las celdas de la fila tienen valor 1
      tablero.splice(fila, 1); //elimino la fila
      tablero.unshift(Array(columnas).fill(0)); //agrego una fila con todas las celdas en 0
      lineasEliminadas++; //incremento la variable lineasEliminadas
    }
  }
  if (lineasEliminadas > 0) {
    //si hay lineas eliminadas
    actualizarPuntuacion(lineasEliminadas); //actualizo la puntuacion
  }
}
let puntuacion = 0; //inicializo la variable puntuacion en 0
function actualizarPuntuacion(lineasEliminadas) {
  const puntosPorLinea = [0, 100, 300, 500, 800]; // Puntos según líneas eliminadas
  puntuacion += puntosPorLinea[lineasEliminadas]; //sumo los puntos por linea eliminada a la puntuacion
  document.getElementById("puntuacion").innerText = `Puntuación: ${puntuacion}`; //muestro la puntuacion en el html;
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
        `FIN DE LA PARTIDA. Este juego ha sido desarrollado por José Rubén Arjona Jiménez.
        ${document.getElementById("puntuacion").innerText}
        ${document.getElementById("nivel").innerText}` //muestro la puntuacion
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
  // Rotar la pieza
  else if (event.key === "w" || event.key === "W") {
    //si la tecla presionada es "w" o "W"
    const nuevaPieza = rotarPieza(piezaActual); //roto la pieza
    if (!chequearColisiones(nuevaPieza, posicion.x, posicion.y)) {
      //si no hay colisiones
      piezaActual = nuevaPieza; //actualizo la pieza
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

let intervalo = setInterval(jugar, 500); // Llama a la función jugar cada 500 ms
let velocidad = 500; // Inicializa la velocidad del juego
let nivel = 1; // Nivel inicial

function incrementarDificultad() {
  const puntuacionParaSubirNivel = 300;
  const velocidadMinima = 100;
  const decremento = 50;

  if (
    puntuacion >= nivel * puntuacionParaSubirNivel &&
    velocidad > velocidadMinima
  ) {
    nivel++;
    clearInterval(intervalo);
    velocidad = Math.max(velocidadMinima, velocidad - decremento);
    intervalo = setInterval(jugar, velocidad);
    document.getElementById("nivel").innerText = `Nivel: ${nivel}`;
  }
}

const actualizarPuntuacionOriginal = actualizarPuntuacion;
actualizarPuntuacion = (lineasEliminadas) => {
  // sobreescribe la función actualizarPuntuacion original no es una buena practica pero es una forma de hacerlo sin modificar el codigo original
  actualizarPuntuacionOriginal(lineasEliminadas); // Llama a la función original
  incrementarDificultad(); // Incrementa la dificultad según la puntuación
};
