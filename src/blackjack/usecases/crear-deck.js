import _ from "underscore";





export const crearDeck = (tipos, especiales) => {

    let barraja = []; // he cambiado nombre del arreglo

    for(let i = 2; i <= 10; i++) { 
        for (let tipo of tipos){
            barraja.push(i + tipo); // he cambiado nombre del arreglo
        }
    }
    for (let tipo of tipos) { 
        for (let esp of especiales) {
            barraja.push(esp + tipo); // he cambiado nombre del arreglo
        }
    } 
    return _.shuffle(barraja); // he cambiado nombre del arreglo
}