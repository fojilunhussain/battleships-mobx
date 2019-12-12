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
    coordinates: [ICoordinates, ICoordinates];
    sunk: boolean;
    orientation: "Horizontal" | "Vertical"
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
            coordinates: [{ y: undefined, x: undefined }, { y: undefined, x: undefined }],
            sunk: false,
            orientation: "Horizontal"
        },
        Battleship: {
            name: "Battleship",
            initials: "BA",
            length: 4,
            coordinates: [{ y: undefined, x: undefined }, { y: undefined, x: undefined }],
            sunk: false,
            orientation: "Horizontal"
        },
        Cruiser: {
            name: "Cruiser",
            initials: "CR",
            length: 3,
            coordinates: [{ y: undefined, x: undefined }, { y: undefined, x: undefined }],
            sunk: false,
            orientation: "Horizontal"
        },
        Submarine: {
            name: "Submarine",
            initials: "SU",
            length: 3,
            coordinates: [{ y: undefined, x: undefined }, { y: undefined, x: undefined }],
            sunk: false,
            orientation: "Horizontal"
        },
        Destroyer: {
            name: "Destroyer",
            initials: "DE",
            length: 2,
            coordinates: [{ y: undefined, x: undefined }, { y: undefined, x: undefined }],
            sunk: false,
            orientation: "Horizontal"
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
            this.checkValidPlacement(toJS(shipType))
        })
        console.log(toJS(this.computerBoard))
    }
    @action
    checkValidPlacement = (shipType: IShipState) => {
        shipType.coordinates[0].y = Math.floor(Math.random() * 10) // start y coord
        shipType.coordinates[0].x = Math.floor(Math.random() * 10) // start x coord
        shipType.coordinates[1].y = shipType.coordinates[0].y // end y coord
        shipType.coordinates[1].x = shipType.coordinates[0].x + shipType.length // end x coord

        const exceedsRowLength: boolean = shipType.coordinates[0].x + shipType.length > 9;
        const shipPlacementArea: string[] = this.computerBoard[shipType.coordinates[0].y].slice(
            shipType.coordinates[0].x, shipType.coordinates[1].x
        );
        const cellsOccupied: string[] = shipPlacementArea.filter(function(currentCell) {
            return (currentCell != "_")
        })

        console.log(cellsOccupied)

        if (exceedsRowLength || cellsOccupied.length > 0) {
            console.log("invalid placement")
            console.log(toJS(shipType))
            this.checkValidPlacement(shipType)
        } else {
            console.log("valid placement")
            this.placeShip(shipType)
        }
    }
    @action
    placeShip = (shipType: IShipState) => {
        console.log(toJS(shipType))
        for (let i = 0; i < shipType.length; i++) {
            console.log(shipType.coordinates[0].y, shipType.coordinates[0].x)
            this.computerBoard[shipType.coordinates[0].y][shipType.coordinates[0].x] = shipType.initials
            shipType.coordinates[0].x += 1
        }
        this.gameStarted = true
    }
    @action
    placeHit = (j: number, i: number) => {
        console.log(j, i)
        if (this.computerBoard[j][i] !== "_") {
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