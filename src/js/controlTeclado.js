const musicaFondo = new Audio("/src/sounds/tetris.mp3"); // inicializo la variable musicaFondo con la música de fondo
musicaFondo.loop = true; // repetir la música continuamente
musicaFondo.volume = 0.3; // volumen

/*La música de fondo se reproduce cuando se presiona una tecla, he intentado implementar musica de game over pero no he podido puesto que al ejecutar el alert se detiene
la música el alert actua como un bloqueo del codigo js, solo se me ocurre simular un alert */

// Control de teclado
document.addEventListener("keydown", (event) => {
  musicaFondo.play(); // Reproducir música de fondo
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
