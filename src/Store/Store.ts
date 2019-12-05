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
    computerBoard: string[][]  = []
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
        console.log(toJS(this.playerBoard))
        return(this.playerBoard)
    }
    @action
    generateComputerBoard = () => {
        for (let y = 0; y < 10; y++) {
            this.computerBoard.push([])
            for (let x = 0; x < 10; x++) {
                this.computerBoard[y].push("_")
            }
        }
        console.log(toJS(this.computerBoard))
        return(this.computerBoard)
    }
    @action
    generateStartCoordinates = () => {
        Object.values(this.ships).map((currentObject, index) => {
            console.log(currentObject)
            this.placeShipCoordinateY = Math.floor(Math.random()*10)
            this.placeShipCoordinateX = Math.floor(Math.random()*10)
            console.log(this.placeShipCoordinateY, this.placeShipCoordinateX)
            this.computerBoard[this.placeShipCoordinateY][this.placeShipCoordinateX] = "O"
            console.log(toJS(this.computerBoard))
        })
        return(this.placeShipCoordinateY, this.placeShipCoordinateX, this.computerBoard)
    }
    @action
    determineOrientation = () => {
        if (Math.round(Math.random()*1) === 0) {
            this.orientation = "Horizontal"
            console.log(this.orientation)
            this.placeHorizontally()
            // return this.orientation
        } else {
            this.orientation = "Vertical"
            console.log(this.orientation)
            this.placeVertically()
            // return this.orientation
        }
        return this.orientation
    }
    @action
    placeHorizontally = () => {
        if (this.orientation === "Horizontal") {
            console.log("wwwwwwwww")
        }
    }
    @action
    placeVertically = () => {
        if (this.orientation === "Vertical") {
            console.log("mmmmmmmmm")
        }
    }
    @action
    placeHit = (j:number, i:number) => {
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

export const store : Stores = {
    battleshipsGameStore : new BattleshipsGameStore()
}