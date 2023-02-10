import _ from "underscore";





export const crearDeck = (tipos, especiales) => {

    let deck = [];

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