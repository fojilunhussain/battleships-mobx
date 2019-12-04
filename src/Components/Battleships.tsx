import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Stores } from "../Store/Store"

interface IInjectedProps {
    // playerBoard?: string[],
    // computerBoard : string[],
    // hits : number,
    // misses : number,
    // gameStarted : boolean,
    generatePlayerBoard?: () => void;
}

const BattleshipsRaw = (props: IInjectedProps) => {

    const { generatePlayerBoard } = props;

    const generateBoards = () => {
        generatePlayerBoard!()
    }

    return(
        <>
            <button onClick = {() => {generateBoards()}}>
                New game
            </button>
        </>
    );
}

export const Battleships = inject(
    ({ store }: { store: Stores }): IInjectedProps => ({
        generatePlayerBoard: store.battleshipsGameStore.generatePlayerBoard
    })
  )(observer(BattleshipsRaw));