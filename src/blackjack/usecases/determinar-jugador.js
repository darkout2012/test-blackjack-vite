





export const determinarGanador = (puntosJugadores) => { 
    const [puntosMinimos, puntosComputadora] = puntosJugadores; 
    setTimeout(() => { 
          if (puntosComputadora === puntosMinimos) { 
              alert("Nadie gana");
          } else if (puntosMinimos > 21) { 
              alert("Computadora gana");
          } else if (puntosComputadora > 21) { 
              alert ("Jugador gana");
          }  else {
              alert("Computadora gana");
          } 
      }, 100);
  }