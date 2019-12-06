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
    placeShipCoordinateY: number = 0
    @observable
    placeShipCoordinateX: number = 0
    @observable
    ships: ships = {
        Carrier: 5,
        Battleship: 4,
        Cruiser: 3,
        Submarine: 3,
        Destroyer: 2
    }
    @observable
    orientation: string = ""
    // @observable
    // hits: number = 0
    // @observable
    // misses: number = 0
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
        this.placeShipCoordinateY = Math.floor(Math.random() * 10)
        this.placeShipCoordinateX = Math.floor(Math.random() * 10)
        if (this.placeShipCoordinateX + currentLength > 9
            || this.computerBoard.slice(
                this.placeShipCoordinateX, currentLength + this.placeShipCoordinateX + 1
            ).includes(["O"])) {
                this.checkValidPlacement(currentLength)
            } else {
                this.placeShip(currentLength)
            }
    }
    @action
    placeShip = (currentLength: number) => {
        for (let i = 0; i < currentLength; i++) {
            this.computerBoard[this.placeShipCoordinateY][this.placeShipCoordinateX] = "O"
            console.log(this.placeShipCoordinateY, this.placeShipCoordinateX)
            this.placeShipCoordinateX += 1
        }
    }
    @action
    placeHit = (j: number, i: number) => {
        console.log(j, i)
        if (this.computerBoard[j][i] === "O") {
            console.log("ooo")
            this.playerBoard[j][i] = "O"
        } else {
            this.playerBoard[j][i] = "X"
            console.log("eee")
        }
    }
}

export const store: Stores = {
    battleshipsGameStore: new BattleshipsGameStore()
}