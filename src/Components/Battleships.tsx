import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Stores } from "../Store/Store"

interface IInjectedProps {
    playerBoard?: string[][];
    computerBoard?: string[][];
    // hits : number,
    // misses : number,
    // gameStarted : boolean,
    orientation?: string;
    generatePlayerBoard?: () => void;
    generateComputerBoard?: () => void;
    // generateStartCoordinates?: () => void;
    // determineOrientation?: () => void;
    // placeHorizontally?: () => void;
    placeShip?: () => void;
    fillBoard?: () => void;
    placeHit?: (j:number, i:number) => void;
}

const BattleshipsRaw = (props: IInjectedProps) => {

    const { playerBoard, computerBoard, orientation, generatePlayerBoard,
            generateComputerBoard,
            // generateStartCoordinates, determineOrientation, placeHorizontally,
            placeShip, fillBoard, placeHit
          } = props;

    const generateBoards = () => {
        generatePlayerBoard!()
        generateComputerBoard!()
        // generateStartCoordinates!()
        // determineOrientation!()
        placeShip!()
        fillBoard!()
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
        orientation: store.battleshipsGameStore.orientation,
        generatePlayerBoard: store.battleshipsGameStore.generatePlayerBoard,
        generateComputerBoard: store.battleshipsGameStore.generateComputerBoard,
        // generateStartCoordinates: store.battleshipsGameStore.generateStartCoordinates,
        // determineOrientation: store.battleshipsGameStore.determineOrientation,
        // placeHorizontally: store.battleshipsGameStore.placeHorizontally,
        placeShip: store.battleshipsGameStore.placeShip,
        fillBoard: store.battleshipsGameStore. fillBoard,
        placeHit: store.battleshipsGameStore.placeHit
    })
  )(observer(BattleshipsRaw));