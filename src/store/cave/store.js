import { combineReducers } from 'redux';
import { createStore } from 'redux';
import reducer from "./reducer";


const myReducer = combineReducers({
    rooms: reducer
})
const store = createStore(myReducer);

export default store;