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
