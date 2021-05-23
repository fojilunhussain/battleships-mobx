import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Battleships } from './Components/Battleships';
import { Provider } from 'mobx-react';
import { store } from './Store/Store';

const WrappedBattleships = () => {
    return (
        <Provider store = {store}>
            <Battleships/>
        </Provider>
    );
}

ReactDOM.render(<WrappedBattleships />, document.getElementById('root'));