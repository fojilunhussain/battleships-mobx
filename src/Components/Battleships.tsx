import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Stores } from "../Store/Store"

interface IInjectedProps {
    playerBoard?: string[][];
    generatePlayerBoard?: () => void;
    generateComputerBoard?: () => void;
    fillBoard?: () => void;
    placeHit?: (j:number, i:number) => void;
    hits?: number;
    misses?: number;
    checkIfEnded?: () => void;
}

const BattleshipsRaw = (props: IInjectedProps) => {

    const { playerBoard, generatePlayerBoard, generateComputerBoard,
        fillBoard, placeHit, hits, misses, checkIfEnded
          } = props;

    const generateBoards = () => {
        generatePlayerBoard!()
        generateComputerBoard!()
        fillBoard!()
    }

    const checkIfHit = (j:number, i:number) => {
        placeHit!(j, i)
    }

    const checkGameOver = () => {
        checkIfEnded!()
    }
    
    return(
        <>
            <button onClick = {() => {generateBoards()}}>
                New game
            </button>

            {playerBoard!.map((row, j) =>
                <div key={j}>
                    {row.map((column, i) =>
                        <button
                            id = {`cell${j}${i}`}
                            key = {`${j}${i}`}
                            name={`${j},${i}`}
                            onClick = {() => {
                                checkIfHit(j, i)
                                checkGameOver()
                            }}
                        >
                            {playerBoard![j][i]}
                        </button>
                    )}
                </div>
            )}
        </>
    );
}

export const Battleships = inject(
    ({ store }: { store: Stores }): IInjectedProps => ({
        playerBoard: store.battleshipsGameStore.playerBoard,
        generatePlayerBoard: store.battleshipsGameStore.generatePlayerBoard,
        generateComputerBoard: store.battleshipsGameStore.generateComputerBoard,
        fillBoard: store.battleshipsGameStore. fillBoard,
        placeHit: store.battleshipsGameStore.placeHit,
        hits: store.battleshipsGameStore.hits,
        misses: store.battleshipsGameStore.misses,
        checkIfEnded: store.battleshipsGameStore.checkIfEnded
    })
  )(observer(BattleshipsRaw));