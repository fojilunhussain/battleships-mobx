import { observable } from "mobx";

interface IBattleshipsInterface {
    playersBoard: string[],
    computersBoard: string[],
    ships: object,
    hits: number,
    misses: number,
    turnsRemaining: number,
    gameStarted: boolean
}

class BattleshipsStore {
  @observable
  battleshipsStore = {
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
  };
}

var newGame = new BattleshipsStore

console.log(newGame.battleshipsStore.hits)
