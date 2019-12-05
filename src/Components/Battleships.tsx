import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Stores } from "../Store/Store"

interface IInjectedProps {
    playerBoard?: string[][];
    // computerBoard : string[][],
    // hits : number,
    // misses : number,
    // gameStarted : boolean,
    generatePlayerBoard?: () => void;
    generateComputerBoard?: () => void;
    generateRandomCoordinates?: () => void;
}

const BattleshipsRaw = (props: IInjectedProps) => {

    const [guessY, setGuessY] = React.useState<number>()
    const [guessX, setGuessX] = React.useState<number>()

    const { playerBoard, generatePlayerBoard, generateComputerBoard,
            generateRandomCoordinates
          } = props;

    const generateBoards = () => {
        generatePlayerBoard!()
        generateComputerBoard!()
        generateRandomCoordinates!()
    }

    const checkIfHit = () => {
        
    }
    console.log(guessY, guessX)

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
                                setGuessY(j)
                                setGuessX(i)
                                checkIfHit()
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
        generateRandomCoordinates: store.battleshipsGameStore.generateRandomCoordinates
    })
  )(observer(BattleshipsRaw));