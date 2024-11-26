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
