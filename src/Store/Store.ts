import { observable, action, computed, toJS } from 'mobx';

export interface Stores {
    battleshipsGameStore: BattleshipsGameStore
}

interface IShips {
    Carrier: IShipState;
    Battleship: IShipState;
    Cruiser: IShipState;
    Submarine: IShipState;
    Destroyer: IShipState;
}

interface ICoordinates {
    y: number;
    x: number;
}

interface IShipState {
    length: number;
    coordinates: [ICoordinates,ICoordinates];
    sunk: boolean;
    initials: string;
}

class BattleshipsGameStore {
    @observable
    playerBoard: string[][] = []
    @observable
    computerBoard: string[][] = []
    @observable
    ships: IShips = {
        Carrier: {
            length: 5,
            coordinates: [{x: 0, y: 0}, {x: 4, y: 0}],
            sunk: false,
            initials: "CA"
        },
        Battleship: {
            length: 4,
            coordinates: [{x: 0, y: 1}, {x:3, y: 1}],
            sunk: false,
            initials: "BA"
        },
        Cruiser: {
            length: 3,
            coordinates: [{x: 0, y: 2}, {x:2, y: 2}],
            sunk: false,
            initials: "CR"
        },
        Submarine: {
            length: 3,
            coordinates: [{x: 0, y: 3}, {x:2, y: 3}],
            sunk: false,
            initials: "SU"
        },
        Destroyer: {
            length: 2,
            coordinates: [{x: 0, y: 4}, {x:1, y: 4}],
            sunk: false,
            initials: "DE"
        }
    }
    @observable
    hits: number = 0
    @observable
    misses: number = 0
    @observable
    gameStarted: boolean = false

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
        Object.values(this.ships).map(shipLength => {
            console.log(shipLength)
            this.checkValidPlacement(shipLength)
        })
        console.log(toJS(this.computerBoard))
    }
    @action
    checkValidPlacement = (shipLength: number) => {
        let placeShipCoordinateY: number = Math.floor(Math.random() * 10)
        let placeShipCoordinateX: number = Math.floor(Math.random() * 10)
        if (placeShipCoordinateX + shipLength > 9
            || this.computerBoard[placeShipCoordinateY].slice(
                placeShipCoordinateX, shipLength + placeShipCoordinateX -1
            ).includes("O")) {
                this.checkValidPlacement(shipLength)
            } else {
                this.placeShip(shipLength, placeShipCoordinateY, placeShipCoordinateX)
            }
    }
    @action
    placeShip = (shipLength: number, placeShipCoordinateY: number, placeShipCoordinateX: number) => {
        for (let i = 0; i < shipLength; i++) {
            this.computerBoard[placeShipCoordinateY][placeShipCoordinateX] = "O"
            console.log(placeShipCoordinateY, placeShipCoordinateX)
            placeShipCoordinateX += 1
        }
        this.gameStarted = true
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