import _ from "underscore";



// Black Jack ver 1.0.3

// En esta version vamos a minimizar el archivo javascript para que ocupe menos espacio y para que nadie lo pueda descifrar desde navegador. 

const miModulo = (() => { // Inicio de la funcion IIFE
    // Ahora si intentamos llamar en consola del navegador la baraja de cartas "deck" nos saldra Uncaught ReferenceError: deck is not defined

    "use strict"

    let deck         = [];
    const tipos      = ["C", "D", "H", "S"],
          especiales = ["A", "J", "Q", "K"];

    // let puntosJugador = 0, // OLD - en cambio crearemos un arreglo en comun para ambos
    //     puntosComputadora = 0; // OLD - en cambio crearemos un arreglo en comun para ambos

    let puntosJugadores = []; // OPTIMIZACION - aqui se acumularan puntos de jugadores y computadora (ultimo valor del arreglo sera siempre el de computadora).

    // Referencias del HTML - variables con las que podamos llamar a cada uno de los elementos en HTML
    // ***********************************************************************************************

    const btnNuevo = document.querySelector("#btnNuevo"),
          btnPedir = document.querySelector("#btnPedir"), 
          btnDetener = document.querySelector("#btnDetener"); 
    
    const divCartasJugadores = document.querySelectorAll(".divCartas"), // OPTIMIZACION
          // divCartasJugador = document.querySelector("#jugador-cartas"), // OLD
          // divCartasComputadora = document.querySelector("#computadora-cartas"), // OLD
          puntosHTML = document.querySelectorAll("small");





    // Funciones:
    // **********


    // Esta funcion inicializa el juego: // NUEVA FUNCION
    // =================================
    const inicializarJuego = (numJugadores = 2) => { // OPTIMIZACION - crea el deck y lo mezcla
    // Como argumento le ponemos numero de jugadores que tendra el partido y por defecto sera 2.
        
        deck = crearDeck();

        // deck = []; // OLD
        // deck = crearDeck(); // OLD

        puntosJugadores = []; // OPTIMIZACION - reinicializamos puntos de jugadores.

        for (let i = 0; i < numJugadores; i++) { // OPTIMIZACION - llenamos el arreglo vacio "let puntosJugadores" con dos ceros, es decir, puntos iniciales de cada uno sera un 0.
            puntosJugadores.push(0); // OPTIMIZACION - estamos agregando valor inicial de puntos a cada uno de los jugadores.
        }
        
        // puntosComputadora = 0; // OLD - lo haremos con el ciclo for
        // puntosJugador = 0; // OLD - lo haremos con el ciclo for

        puntosHTML.forEach(elem => elem.innerText = 0); // OPTIMIZACION - anulamos todos los puntos obtenidos de cada jugador mediante metodo forEach.

        // puntosHTML[0].innerText = 0; // OLD - lo hicimos con metodo forEach
        // puntosHTML[1].innerText = 0; // OLD - lo hicimos con metodo forEach

        divCartasJugadores.forEach(elem => elem.innerHTML = ""); // OPTIMIZACION

        // divCartasComputadora.innerHTML = ""; 
        // divCartasJugador.innerHTML = ""; 

        btnDetener.disabled = false; 
        btnPedir.disabled = false; 

    }



    // Esta funcion crea una nueva baraja de cartas y tiene que retornar baraja de cartas mezclada:
    // ===========================================================================================
    const crearDeck = () => {

        deck = []; // OPTIMIZACION - reinicializamos el deck.

        for(let i = 2; i <= 10; i++) { 
            for (let tipo of tipos){
                deck.push(i + tipo);
            }
        }
        for (let tipo of tipos) { 
            for (let esp of especiales) {
                deck.push(esp + tipo);
            }
        } 
        // deck = _.shuffle(deck); // OLD
        // return deck; // OLD
        return _.shuffle(deck); // OPTIMIZACION - la idea de esta funcion es crear y retornar el deck mezclado.
    }
    // crearDeck(); // OLD - no tiene sentido llamar esta funcion aqui, crearemos una constante y la pondremos al principio de todo el codigo.




    // Esta funcion me permite pedir una carta
    // =======================================
    const pedirCarta = () => {
        if (deck.length === 0) { 
            throw "No hay cartas den la baraja"; 
        }
        // const carta = deck.pop(); // OLD - no tiene sentido crear esta constante ya que la funcion tiene que devolver la carta y esto nos hara el metodo .pop
        //return carta; // OLD
        return deck.pop(); // OPTIMIZACION - funcion regresa nueva carta, es decir, metodo .pop elimina una elemento en el deck y regresa elemento eliminado
    }
    




    // Esta funcion me permite saber valor de la carta:
    // ================================================
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length -1);
        return (isNaN(valor)) ? (valor === "A") ? 11 : 10 : valor * 1; 
    }



    // Esta funcion crea la carta: // NUEVA FUNCION
    // ===========================

    const crearCarta = (carta, turno) => { // OPTIMIZACION - funcion general para todos de crear la carta
        const imgCarta = document.createElement("img"); 
        imgCarta.src = `assets/cartas/${carta}.png`; 
        imgCarta.classList.add("carta"); 
        // divCartasComputadora.append(imgCarta); // OLD - utilizaremos nueva referencia general "divCartasJugadores".
        divCartasJugadores[turno].append(imgCarta); // OPTIMIZACION - añadimos cartas a sus bloques respectivos mediante indice del arreglo.
    }


    // Esta funcion evalua quien gana: // NUEVA FUNCION
    // ===============================

    const determinarGanador = () => { // OPTIMIZACION - esa funcion llamaremos despues de que termine su turno la computadora.
    
      const [puntosMinimos, puntosComputadora] = puntosJugadores; // OPTIMIZACION - para no cambiar la condicion de evaluar quien gana simplemente
        // crearemos variables "puntosMinimos" y "puntosComputadora" extraendolos del arreglo general de "puntosJugadores" mediante desestructuracion.
      setTimeout(() => { // OLD - en cambio crearemos funcion "determinarGanador".
            if (puntosComputadora === puntosMinimos) { // OPIMIZACION - para caso de 2 jugadores vamos a desestructurar el arreglo de puntosJugadores.
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

    // Esta funcion permite acumular puntos jugadores: // NUEVA FUNCION
    // ===============================================
    // Turno: 0 = primer jugador y el ultimo sera computadora.
    const acumularPuntos = (carta, turno) => { // OPTIMIZACION - la idea es acumular puntos del jugador y la computadora, tiene que hacerlo en su respectiva posicion del arreglo. 
        // Tendriamos que quitar las variables "let" de jugador y computadora y crear nuevo arreglo vacion para ambos.
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta); // OPTIMIZACION - asignamos al arreglo vacio indicando la posicion del indice en el arreglo a quien le toca acumular los puntos.
        puntosHTML[turno].innerText = puntosJugadores[turno]; // OPTIMIZACION - asignamos al html mediante posicion de indice respectivo (ultimo elemento del arreglo siempre sera computadora) los puntos acumulados de cada uno.
        return puntosJugadores[turno]; // OPTIMIZACION - funcion retorna los puntos respectivos de cada jugador.
    }





    // Esta funcion nos permite activar turno de computadora
    // =====================================================
    const turnoComputadora = (puntosMinimos) => {
        
        let puntosComputadora = 0; // OPTIMIZACION

        do {
            
            const carta = pedirCarta();
            
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length -1); // OPTIMIZACION - llamamos a funcion con argumento de carta (funcion pedir carta nos devuelve la carta) y argumento de puntos de la computadora (siempre sera la ultima posicion del arreglo). 
            crearCarta(carta, puntosJugadores.length -1);

            // Tendriamos que evitar llamar estas variables aqui y las pasaremos a nueva funcion creada de "const acumularPuntos".
            // puntosComputadora = puntosComputadora + valorCarta(carta); // OLD - este codico se repite en "evento del boton pedir carta"
            // puntosHTML[1].innerText = puntosComputadora; // OLD - este codico se repite en "evento del boton pedir carta"
            
            // const imgCarta = document.createElement("img"); // OLD - crearemos funcion para todos de crear carta
            // imgCarta.src = `assets/cartas/${carta}.png`; // OLD - crearemos funcion para todos de crear carta
            // imgCarta.classList.add("carta"); // OLD - crearemos funcion para todos de crear carta
            // divCartasComputadora.append(imgCarta); // OLD - crearemos funcion para todos de crear carta
            
            // if (puntosMinimos > 21) { // OLD - esa condicion no es necesaria
            //     break;
            // }

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador();

    //    setTimeout(() => { // OLD - en cambio crearemos funcion "determinarGanador".
    //         if (puntosComputadora === puntosMinimos) {
    //         alert("Nadie gana");
    //         } else if (puntosMinimos > 21) { 
    //         alert("Computadora gana");
    //         } else if (puntosComputadora > 21) { 
    //         alert ("Jugador gana");
    //         }  else {
    //             alert("Gana computadora");
    //         } 
    //     }, 10);

    }





    // Eventos:
    // ********


    // Boton - Nuevo juego
    // ===================
    btnNuevo.addEventListener("click", () => {
        
        inicializarJuego(); // OPTIMIZACION - llamamos a la funcion de crear el deck


        // Lo que aparece abajo lo asignaremos en la funcion de inicializar nuevo juego.
        // deck = []; // OLD
        // deck = crearDeck(); // OLD
        
        // puntosComputadora = 0; // OLD - en cambio se ha creado un arreglo que tendra elementos "puntos" de cada uno.
        // puntosJugador = 0; // OLD - en cambio se ha creado un arreglo que tendra elementos "puntos" de cada uno.

        // puntosHTML[0].innerText = 0; // OLD
        // puntosHTML[1].innerText = 0; // OLD
        // divCartasComputadora.innerHTML = ""; // OLD
        // divCartasJugador.innerHTML = ""; // OLD
        // btnDetener.disabled = false; // OLD
        // btnPedir.disabled = false; // OLD
    })




    // Boton - Pedir Carta
    // ===================
    btnPedir.addEventListener("click", () => {
        
        const carta = pedirCarta(); 
        const puntosJugador = acumularPuntos(carta, 0); // OPTIMIZACION - ponemos el 0 como argumento ya que primer elemento del arreglo es del jugador.
        crearCarta(carta, 0); // OPTIMIZACION 

        // puntosJugador = puntosJugador + valorCarta(carta); // OLD - este codico se repite en funcion del turno de computadora
        // puntosHTML[0].innerText = puntosJugador; // OLD - este codico se repite en funcion del turno de computadora
        
        // const imgCarta = document.createElement("img"); // OLD - en cambio tenemos la funcion de crear carta.
        // imgCarta.src = `assets/cartas/${carta}.png`; // OLD - en cambio tenemos la funcion de crear carta.
        // imgCarta.classList.add("carta"); // OLD - en cambio tenemos la funcion de crear carta.
        // divCartasJugador.append(imgCarta); // OLD - en cambio tenemos la funcion de crear carta.

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
    // ===============
    btnDetener.addEventListener("click", () => {
        btnDetener.disabled = true; 
        btnPedir.disabled = true; 
        // turnoComputadora(puntosJugador); // OLD - puntosJugador sustituimos por variable general para ambos jugadores "puntosJugadores".
        turnoComputadora(puntosJugadores[0]); // OPTIMIZACION - como argumento mandamos variable general puntosJugadores.
    })




    // IMPORTANTE

    // Este codigo javascript esta sin proteger, es decir, se puede acceder mediante consola en navegador y tener acceso a todo el codigo del juego.
    // En la proxima version vamos a mejorar esto y tambien optimizaremos el codigo y lo haremos por modulos.


    // return "Hola mundo"; // La informacion que se encuentra dentro de la IIFE es privada y para acceder a cosas determinadas desde fuera necesitaremos ponerlo en return.

    // A veces nos interesa que alguien tenga acceso desde fuera para llamar a una u otra funcion.
    // Por ejemplo:
    // Responsable de activar el Nuevo juego para la gente que ha pagado la cuota.

    return {
        nuevoJuego: inicializarJuego // OPTIMIZACION - si le queremos dar un nuevo nombre a la funcion de inicializar juego lo podemos hacer mediante creacion de nuevo objeto.
    };

}) (); // Final de la funcion IIFE





