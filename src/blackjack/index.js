import _ from "underscore";

import { crearDeck } from "./usecases/crear-deck";



// Black Jack ver 1.0.3

const miModulo = (() => { 
    
    let deck         = [];
    const tipos      = ["C", "D", "H", "S"],
          especiales = ["A", "J", "Q", "K"];
    let puntosJugadores = [];
    const btnNuevo = document.querySelector("#btnNuevo"),
          btnPedir = document.querySelector("#btnPedir"), 
          btnDetener = document.querySelector("#btnDetener"); 
    const divCartasJugadores = document.querySelectorAll(".divCartas"), 
          puntosHTML = document.querySelectorAll("small");



    // Esta funcion inicializa el juego: 
    const inicializarJuego = (numJugadores = 2) => { 
        deck = crearDeck(tipos, especiales);
        puntosJugadores = []; 
        for (let i = 0; i < numJugadores; i++) { 
            puntosJugadores.push(0); 
        }
        puntosHTML.forEach(elem => elem.innerText = 0); 
        divCartasJugadores.forEach(elem => elem.innerHTML = ""); 
        btnDetener.disabled = false; 
        btnPedir.disabled = false; 

    }



    // Esta funcion crea una nueva baraja de cartas y tiene que retornar baraja de cartas mezclada:
    // ===========================================================================================
    // const crearDeck = () => {

    //     deck = []; // OPTIMIZACION - reinicializamos el deck.

    //     for(let i = 2; i <= 10; i++) { 
    //         for (let tipo of tipos){
    //             deck.push(i + tipo);
    //         }
    //     }
    //     for (let tipo of tipos) { 
    //         for (let esp of especiales) {
    //             deck.push(esp + tipo);
    //         }
    //     } 
    //     // deck = _.shuffle(deck); // OLD
    //     // return deck; // OLD
    //     return _.shuffle(deck); // OPTIMIZACION - la idea de esta funcion es crear y retornar el deck mezclado.
    // }
    // crearDeck(); // OLD - no tiene sentido llamar esta funcion aqui, crearemos una constante y la pondremos al principio de todo el codigo.




    // Esta funcion me permite pedir una carta
    
    
    
    const pedirCarta = () => {
        if (deck.length === 0) { 
            throw "No hay cartas den la baraja"; 
        }
        return deck.pop(); 
    }
    


    // Esta funcion me permite saber valor de la carta:
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length -1);
        return (isNaN(valor)) ? (valor === "A") ? 11 : 10 : valor * 1; 
    }



    // Esta funcion crea la carta: 
    const crearCarta = (carta, turno) => { 
        const imgCarta = document.createElement("img"); 
        imgCarta.src = `assets/cartas/${carta}.png`; 
        imgCarta.classList.add("carta"); 
        divCartasJugadores[turno].append(imgCarta); 
    }


    // Esta funcion evalua quien gana: 
    const determinarGanador = () => { 
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


    // Esta funcion permite acumular puntos jugadores: 
    const acumularPuntos = (carta, turno) => { 
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);  
        puntosHTML[turno].innerText = puntosJugadores[turno]; 
        return puntosJugadores[turno]; 
    }



    // Esta funcion nos permite activar turno de computadora
    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0;
        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length -1); 
            crearCarta(carta, puntosJugadores.length -1);
        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
        determinarGanador();
    }



    // Boton - Nuevo juego
    btnNuevo.addEventListener("click", () => {
        inicializarJuego(); 
    })


    // Boton - Pedir Carta
    btnPedir.addEventListener("click", () => {
        const carta = pedirCarta(); 
        const puntosJugador = acumularPuntos(carta, 0); 
        crearCarta(carta, 0); 
        if (puntosJugador > 21) {
            btnPedir.disabled = true; 
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) { 
            btnPedir.disabled = true; 
            btnDetener.disabled = true; 
            turnoComputadora(puntosJugador);
        }
    })


    // Boton - Detener
    btnDetener.addEventListener("click", () => {
        btnDetener.disabled = true; 
        btnPedir.disabled = true; 
        turnoComputadora(puntosJugadores[0]); 
    })


    return {
        nuevoJuego: inicializarJuego 
    };

}) (); 





