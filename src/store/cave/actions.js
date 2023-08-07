import store from "./store";

export const openNewRoom = () => {
    return {
        type: "OPEN_ROOM",
    }
}

export const handleVisitRoom = (name, value) => {
    let cave = store.getState();
    let room = cave['rooms']['caveRoomsList'].find(el => el['index'] === value);

    return {
        type: "VISIT_ROOM",
        payload: room
    }
}

export const addRoomOnList = (name, value, name2, value2) => {
    return {
        type: "ADD_ROOM_ON_LIST",
        payload: { [name]: value, [name2]: value2 }
    }
}


export const changePlayerState = (name, value) => {
    console.info('!!!!!!');
    console.log('change player state on caves');
    let state = store.getState();
    let currValue = parseInt(state['rooms'][name]);
    return{
        type: "CHANGE_PLAYER_STATE",
        payload: {[name]: parseInt(currValue + value) }
    }
}