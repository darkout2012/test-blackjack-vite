





export const pedirCarta = (deck) => {
    if (deck.length === 0) { 
        throw "No hay cartas den la baraja"; 
    }
    return deck.pop(); 
}