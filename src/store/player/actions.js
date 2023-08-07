
export const changePlayerState = (name, value) => {
    console.log('!!!!!!!!!!!!!!!!!');
    console.log('changePlayerState');
    console.log(name + ': ' + value);
    return {
        type: "CHANGE_PLAYER_STATE",
        payload: {[name]: [value] }
    }
}