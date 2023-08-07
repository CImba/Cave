const initialState = {
    roomsOpenedList: [],
    room: {
        index: '',
        type: '',
    },
    caveRoomsList : [],
    caveSize: [4, 5],
    action: '',
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case "OPEN_ROOM": {
            if (include(state.room, state.roomsOpenedList)) {
                return {
                    ...state,
                    action: 'stay',
                }
            }
            else {
                return {
                    ...state,
                    roomsOpenedList: [...state.roomsOpenedList, state.room],
                    action: 'change opened list',
                }
            }
        }
        case "VISIT_ROOM": {

            return {
                ...state, room: {
                    ...state.room, ...action.payload },
                action: 'change curr room',
            }
        }
        case "ADD_ROOM_ON_LIST": {
            return {
                ...state, caveRoomsList: [
                    ...state.caveRoomsList, action.payload
                ],
                action: 'create cave',
            }
        }

        default: return state;
    }
}


function include(obj = {index: ''}, list = []) {
    for (let i = 0; i < list.length; i = i + 1) {
        if (obj.index === list[i].index)
            return true;
    }
    return false;
}