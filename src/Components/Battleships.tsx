import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Stores } from "../Store/Store"

interface IInjectedProps {
    playerBoard?: string[][];
    guessCoordinateY?: number;
    guessCoordinateX?: number;
    // computerBoard : string[][],
    // hits : number,
    // misses : number,
    // gameStarted : boolean,
    generatePlayerBoard?: () => void;
    generateComputerBoard?: () => void;
    generateRandomCoordinates?: () => void;
}

const BattleshipsRaw = (props: IInjectedProps) => {

    const { playerBoard, guessCoordinateY, guessCoordinateX, generatePlayerBoard, generateComputerBoard,
            generateRandomCoordinates
          } = props;

    const generateBoards = () => {
        generatePlayerBoard!()
        generateComputerBoard!()
        generateRandomCoordinates!()
    }

    return(
        <>
            <button onClick = {() => {generateBoards()}}>
                New game
            </button>

            {playerBoard!.map(row =>
                <div>
                    {row.map(column =>
                        <button>{playerBoard![guessCoordinateY!][guessCoordinateX!]}</button>
                    )}
                </div>
            )}
        </>
    );
}

export const Battleships = inject(
    ({ store }: { store: Stores }): IInjectedProps => ({
        playerBoard: store.battleshipsGameStore.playerBoard,
        guessCoordinateY: store.battleshipsGameStore.guessCoordinateY,
        guessCoordinateX: store.battleshipsGameStore.guessCoordinateX,
        generatePlayerBoard: store.battleshipsGameStore.generatePlayerBoard,
        generateComputerBoard: store.battleshipsGameStore.generateComputerBoard,
        generateRandomCoordinates: store.battleshipsGameStore.generateRandomCoordinates
    })
  )(observer(BattleshipsRaw));