import { observable, action, computed, toJS } from 'mobx';

export interface Stores {
    battleshipsGameStore: BattleshipsGameStore
}

interface ships {
    Carrier: number;
    Battleship: number;
    Cruiser: number;
    Submarine: number;
    Destroyer: number;
}

class BattleshipsGameStore {
    @observable
    playerBoard: string[][] = []
    @observable
    computerBoard: string[][] = []
    @observable
    ships: ships = {
        Carrier: 5,
        Battleship: 4,
        Cruiser: 3,
        Submarine: 3,
        Destroyer: 2
    }
    @observable
    hits: number = 0
    @observable
    misses: number = 0
    // @observable
    // gameStarted: boolean = false

    @action
    generatePlayerBoard = () => {
        for (let y = 0; y < 10; y++) {
            this.playerBoard.push([])
            for (let x = 0; x < 10; x++) {
                this.playerBoard[y].push("_")
            }
        }
        return (this.playerBoard)
    }
    @action
    generateComputerBoard = () => {
        for (let y = 0; y < 10; y++) {
            this.computerBoard.push([])
            for (let x = 0; x < 10; x++) {
                this.computerBoard[y].push("_")
            }
        }
        return (this.computerBoard)
    }
    @action
    fillBoard = () => {
        Object.values(this.ships).map(currentLength => {
            console.log(currentLength)
            this.checkValidPlacement(currentLength)
        })
        console.log(toJS(this.computerBoard))
    }
    @action
    checkValidPlacement = (currentLength: number) => {
        let placeShipCoordinateY = Math.floor(Math.random() * 10)
        let placeShipCoordinateX = Math.floor(Math.random() * 10)
        if (placeShipCoordinateX + currentLength > 9
            || this.computerBoard.slice(
                placeShipCoordinateX, currentLength + placeShipCoordinateX + 1
            ).includes(["O"])) {
                this.checkValidPlacement(currentLength)
            } else {
                this.placeShip(currentLength, placeShipCoordinateY, placeShipCoordinateX)
            }
    }
    @action
    placeShip = (currentLength: number, placeShipCoordinateY: number, placeShipCoordinateX: number) => {
        for (let i = 0; i < currentLength; i++) {
            this.computerBoard[placeShipCoordinateY][placeShipCoordinateX] = "O"
            console.log(placeShipCoordinateY, placeShipCoordinateX)
            placeShipCoordinateX += 1
        }
    }
    @action
    placeHit = (j: number, i: number) => {
        console.log(j, i)
        if (this.computerBoard[j][i] === "O") {
            this.hits += 1
            this.playerBoard[j][i] = "O"
        } else {
            this.playerBoard[j][i] = "X"
            this.misses += 1
        }
    }
}

export const store: Stores = {
    battleshipsGameStore: new BattleshipsGameStore()
}