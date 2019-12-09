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
    y: number | undefined;
    x: number | undefined;
}

interface IShipState {
    name: string;
    initials: string;
    length: number;
    coordinates: [ICoordinates,ICoordinates];
    sunk: boolean;
}

class BattleshipsGameStore {
    @observable
    playerBoard: string[][] = []
    @observable
    computerBoard: string[][] = []
    @observable
    ships: IShips = {
        Carrier: {
            name: "Carrier",
            initials: "CA",
            length: 5,
            coordinates: [{y: undefined, x: undefined}, {y: undefined, x: undefined}],
            sunk: false
        },
        Battleship: {
            name: "Battleship",
            initials: "BA",
            length: 4,
            coordinates: [{y: undefined, x: undefined}, {y: undefined, x: undefined}],
            sunk: false
        },
        Cruiser: {
            name: "Cruiser",
            initials: "CR",
            length: 3,
            coordinates: [{y: undefined, x: undefined}, {y:undefined, x: undefined}],
            sunk: false
        },
        Submarine: {
            name: "Submarine",
            initials: "SU",
            length: 3,
            coordinates: [{y: undefined, x: undefined}, {y: undefined, x: undefined}],
            sunk: false
        },
        Destroyer: {
            name: "Destroyer",
            initials: "DE",
            length: 2,
            coordinates: [{y: undefined, x: undefined}, {y: undefined, x: undefined}],
            sunk: false
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
        Object.values(this.ships).map(shipType => {
            console.log(toJS(shipType))
            this.checkValidPlacement(shipType)
        })
        console.log(toJS(this.computerBoard))
    }
    @action
    checkValidPlacement = (shipType: IShipState) => {
        shipType.coordinates[0].y = Math.floor(Math.random() * 10) // start y coord
        console.log(toJS(shipType.coordinates[0].y))
        shipType.coordinates[0].x = Math.floor(Math.random() * 10) // start x coord
        console.log(toJS(shipType.coordinates[0].x))
        if (shipType.coordinates[0].x + shipType.length > 9
            || this.computerBoard[shipType.coordinates[0].y].slice(
                shipType.coordinates[0].x, shipType.length + shipType.coordinates[0].x - 1
            ).includes("O")) {
                this.checkValidPlacement(shipType)
            } else {
                this.placeShip(shipType.length, shipType.coordinates[0].y, shipType.coordinates[0].x)
            }
        // console.log(toJS(this.ships.shipType.name))
        // let placeShipCoordinateY: number = Math.floor(Math.random() * 10)
        // let placeShipCoordinateX: number = Math.floor(Math.random() * 10)
        // if (placeShipCoordinateX + shipLength > 9
        //     || this.computerBoard[placeShipCoordinateY].slice(
        //         placeShipCoordinateX, shipLength + placeShipCoordinateX -1
        //     ).includes("O")) {
        //         this.checkValidPlacement(shipLength)
        //     } else {
        //         this.placeShip(shipLength, placeShipCoordinateY, placeShipCoordinateX)
        //     }
        console.log(toJS(shipType))
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