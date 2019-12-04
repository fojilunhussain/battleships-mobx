import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();