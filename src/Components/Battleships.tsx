import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Stores } from "../Store/Store"

interface IInjectedProps {
    playerBoard?: string[][];
    computerBoard? : string[][];
    // hits : number,
    // misses : number,
    // gameStarted : boolean,
    generatePlayerBoard?: () => void;
    generateComputerBoard?: () => void;
    generateRandomCoordinates?: () => void;
    placeHit?: (j:number, i:number) => void;
}

const BattleshipsRaw = (props: IInjectedProps) => {

    const { playerBoard, computerBoard, generatePlayerBoard, generateComputerBoard,
            generateRandomCoordinates, placeHit
          } = props;

    const generateBoards = () => {
        generatePlayerBoard!()
        generateComputerBoard!()
        generateRandomCoordinates!()
    }

    const checkIfHit = (j:number, i:number) => {
        placeHit!(j, i)
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
        computerBoard: store.battleshipsGameStore.computerBoard,
        generatePlayerBoard: store.battleshipsGameStore.generatePlayerBoard,
        generateComputerBoard: store.battleshipsGameStore.generateComputerBoard,
        generateRandomCoordinates: store.battleshipsGameStore.generateRandomCoordinates,
        placeHit: store.battleshipsGameStore.placeHit
    })
  )(observer(BattleshipsRaw));