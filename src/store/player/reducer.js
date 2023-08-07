const initialState = {
    health: 100,
    attack: 1,
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case "CHANGE_HEALTH": {
            return {
                ...state, health: { ...action.payload }
            }
        }
        case "CHANGE_ATTACK": {
            return {
                ...state, attack: { ...action.payload }
            }
        }
        case "CHANGE_PLAYER_STATE": {
            return {
                ...state, ...action.payload
            }
        }

        default: return state;
    }
}
