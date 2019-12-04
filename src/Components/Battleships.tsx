import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Stores } from "../Store/Store"

interface IInjectedProps {
    playerBoard?: string[][],
    coordinateY?: number,
    coordinateX?: number,
    // computerBoard : string[][],
    // hits : number,
    // misses : number,
    // gameStarted : boolean,
    generatePlayerBoard?: () => void;
}

const BattleshipsRaw = (props: IInjectedProps) => {

    const { playerBoard, coordinateY, coordinateX, generatePlayerBoard } = props;

    const generateBoards = () => {
        console.log(playerBoard!.toString())
        generatePlayerBoard!()
        console.log(playerBoard![0][0])
    }

    return(
        <>
            <button onClick = {() => {generateBoards()}}>
                New game
            </button>

            {playerBoard!.map(row => row.map(column => <button>{playerBoard![coordinateY!][coordinateX!]}</button>))}
        </>
    );
}

export const Battleships = inject(
    ({ store }: { store: Stores }): IInjectedProps => ({
        playerBoard: store.battleshipsGameStore.playerBoard,
        coordinateY: store.battleshipsGameStore.coordinateY,
        coordinateX: store.battleshipsGameStore.coordinateX,
        generatePlayerBoard: store.battleshipsGameStore.generatePlayerBoard
    })
  )(observer(BattleshipsRaw));