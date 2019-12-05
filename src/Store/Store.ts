import { observable, action, computed, toJS } from 'mobx';

export interface Stores {
    battleshipsGameStore: BattleshipsGameStore
}

// class ShipsGameStore { // add ships later
//     Carrier : number 
// }

class BattleshipsGameStore {
    @observable
    playerBoard: string[][] = []
    @observable
    computerBoard: string[][]  = []
    @observable
    guessCoordinateY: number = 0
    @observable
    guessCoordinateX: number = 0
    @observable
    placeShipCoordinateY: number = 0
    @observable
    placeShipCoordinateX: number = 0
    // @observable
    // ships : ShipsGameStore = {
    //     Carrier: 1,
    //     Battleship: 1,
    //     Cruiser: 1,
    //     Submarine: 1,
    //     Destroyer: 1
    // }
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
    generateRandomCoordinates = () => {
        this.placeShipCoordinateY = Math.floor(Math.random()*10)
        this.placeShipCoordinateX = Math.floor(Math.random()*10)
        console.log(this.placeShipCoordinateY, this.placeShipCoordinateX)
        this.computerBoard[this.placeShipCoordinateY][this.placeShipCoordinateX] = "X"
        console.log(toJS(this.computerBoard))
        return(this.placeShipCoordinateY, this.placeShipCoordinateX, this.computerBoard)
    }
    @action
    placeCorrectHit = (j:number, i:number) => {
        console.log(j, i)
        if (this.computerBoard[j][i] === "X") {
            console.log("ooo")
            this.playerBoard[j][i] = "X"
        } else {
            console.log("eee")
        }
    }
}

export const store : Stores = {
    battleshipsGameStore : new BattleshipsGameStore()
}