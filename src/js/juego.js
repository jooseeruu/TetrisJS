// Variables globales para el juego
let intervalo = setInterval(jugar, 500); // Llama a la función jugar cada 500 ms
let velocidad = 500; // Inicializa la velocidad del juego
let nivel = 1; // Nivel inicial

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
      location.reload(); //recargo la pagina
    }
  } else {
    posicion.y++;
  }
}

function jugar() {
  //funcion jugar
  actualizar(); //llamo a la funcion actualizar
  dibujarTablero(); //llamo a la funcion dibujarTablero para dibujar el tablero
  dibujarPieza(piezaActual, posicion.x, posicion.y); //llamo a la funcion dibujarPieza para dibujar la pieza actual
}

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

function incrementarDificultad() {
  const puntuacionParaSubirNivel = 300; // puntuación necesaria para subir de nivel
  const velocidadMinima = 100; // velocidad mínima del juego (ms) a  menos velocidad mas dificultad
  const decremento = 50; // decremento de velocidad al subir de nivel

  if (
    //si la puntuacion es mayor o igual al nivel por la puntuacion para subir de nivel y la velocidad es mayor a la velocidad minima
    puntuacion >= nivel * puntuacionParaSubirNivel &&
    velocidad > velocidadMinima
  ) {
    //incremento el nivel, detengo el intervalo, decremento la velocidad y vuelvo a iniciar el intervalo
    nivel++;
    clearInterval(intervalo); //detengo el intervalo para cambiar la velocidad (no se puede cambiar la velocidad de un intervalo en ejecución)
    velocidad = Math.max(velocidadMinima, velocidad - decremento);
    intervalo = setInterval(jugar, velocidad);
    document.getElementById("nivel").innerText = `Nivel: ${nivel}`;
  }
}

const actualizarPuntuacionOriginal = actualizarPuntuacion; // Guarda la función original
actualizarPuntuacion = (lineasEliminadas) => {
  // monkey patching  o parcheo de la función actualizarPuntuacion
  // sobreescribe la función actualizarPuntuacion original no es una buena practica pero es una forma de hacerlo sin modificar el codigo original
  actualizarPuntuacionOriginal(lineasEliminadas); // Llama a la función original
  incrementarDificultad(); // Incrementa la dificultad según la puntuación
};
