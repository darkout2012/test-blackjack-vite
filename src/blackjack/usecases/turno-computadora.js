import { acumularPuntos } from "..";
import { determinarGanador } from "./determinar-jugador"; 
import { pedirCarta } from "./pedir-carta";
import { crearCarta } from "./crear-carta";



export const turnoComputadora = (puntosMinimos, deck, puntosJugadores, divCartasJugadores) => {
    let puntosComputadora = 0;
    do {
        const carta = pedirCarta(deck); // mandamos como argumentos: deck
        puntosComputadora = acumularPuntos(carta, puntosJugadores.length -1); 
        crearCarta(carta, puntosJugadores.length -1, divCartasJugadores);
    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
    determinarGanador(puntosJugadores);
}