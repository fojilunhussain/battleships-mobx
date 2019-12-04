import { observable, action, computed } from 'mobx';

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
    // @observable
    // ships : ShipsGameStore = {
    //     Carrier: 1,
    //     Battleship: 1,
    //     Cruiser: 1,
    //     Submarine: 1,
    //     Destroyer: 1
    // }
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
        console.log((this.playerBoard).toString())
        return(this.playerBoard)
    }
}

export const store : Stores = {
    battleshipsGameStore : new BattleshipsGameStore()
}