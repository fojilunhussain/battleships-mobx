import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Stores } from "../Store/Store"

interface IInjectedProps {
    playerBoard?: string[][];
    coordinateY?: number;
    coordinateX?: number;
    // computerBoard : string[][],
    // hits : number,
    // misses : number,
    // gameStarted : boolean,
    generatePlayerBoard?: () => void;
    generateComputerBoard?: () => void;
}

const BattleshipsRaw = (props: IInjectedProps) => {

    const { playerBoard, coordinateY, coordinateX, generatePlayerBoard, generateComputerBoard } = props;

    const generateBoards = () => {
        console.log(playerBoard!.toString())
        generatePlayerBoard!()
        generateComputerBoard!()
    }

    return(
        <>
            <button onClick = {() => {generateBoards()}}>
                New game
            </button>

            {playerBoard!.map(row =>
                <div>
                    {row.map(column =>
                        <button>{playerBoard![coordinateY!][coordinateX!]}</button>
                    )}
                </div>
            )}
        </>
    );
}

export const Battleships = inject(
    ({ store }: { store: Stores }): IInjectedProps => ({
        playerBoard: store.battleshipsGameStore.playerBoard,
        coordinateY: store.battleshipsGameStore.coordinateY,
        coordinateX: store.battleshipsGameStore.coordinateX,
        generatePlayerBoard: store.battleshipsGameStore.generatePlayerBoard,
        generateComputerBoard: store.battleshipsGameStore.generateComputerBoard
    })
  )(observer(BattleshipsRaw));