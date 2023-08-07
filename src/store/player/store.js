import { combineReducers } from 'redux';
import { createStore } from 'redux';
import reducer from "./reducer";


const myReducer = combineReducers({
    player: reducer
})
const player = createStore(myReducer);

export default player;