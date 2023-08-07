import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Cave from "./components/Cave";
import store from "./store/cave/store";
import {Provider} from "react-redux";
import {
    handleVisitRoom, openNewRoom
} from './store/cave/actions';


const root = ReactDOM.createRoot(document.getElementById('root'));
const unsubscribe = store.subscribe(() =>
    console.log(store.getState())
);

root.render(
    <Cave />
)



