import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Stores } from "../Store/Store"

interface IInjectedProps {
    playerBoard?: string[][],
    // computerBoard : string[][],
    // hits : number,
    // misses : number,
    // gameStarted : boolean,
    generatePlayerBoard?: () => void;
}

const BattleshipsRaw = (props: IInjectedProps) => {

    const { playerBoard, generatePlayerBoard } = props;

    const generateBoards = () => {
        console.log(playerBoard!.toString())
        generatePlayerBoard!()
        console.log(playerBoard![0][0])
    }

    return(
        <>
            <button onClick = {() => {generateBoards()}}>
                New game
            </button><br />

            {playerBoard!.map(row => (<button></button>))}
        </>
    );
}

export const Battleships = inject(
    ({ store }: { store: Stores }): IInjectedProps => ({
        playerBoard: store.battleshipsGameStore.playerBoard,
        generatePlayerBoard: store.battleshipsGameStore.generatePlayerBoard
    })
  )(observer(BattleshipsRaw));