import { observable, autorun } from 'mobx'

const battleshipsStore = observable({
    playersBoard: [],
    computersBoard: [],
    ships: {
        Carrier: 5,
        Battleship: 4,
        Cruiser: 3,
        Submarine: 3,
        Destroyer: 2
    },
    hits: 0,
    misses: 100,
    turnsRemaining: 100,
    gameStarted: false
})