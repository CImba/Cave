import './Cave.css';
import Room from "./Room";
import ModalAction from "./ModalAction";
import store from "../store/cave/store";
import {addRoomOnList, handleVisitRoom} from "../store/cave/actions";
import player from "../store/player/store";
import Player from "./Player";

function Cave() {
    const states = ['default', 'empty', 'treasure', 'fight'];
    let stateCave = store.getState();
    const size = stateCave['rooms']['caveSize'];
    let roomsMap = [];
    const map = [
        [1, 0, 0, 1, 0],
        [2, 2, 3, 2, 0],
        [0, 0, 2, 0, 0],
        [0, 0, 2, 2, 1]
    ];

    // function handleChange() {
    //     let stateCave = store.getState();
    //     let statePlayer = player.getState();
    //     let tmp = stateCave['rooms']['room']['index'];
    // }

    function init() {
        console.log('!!!!!!');
        console.log('init cave');
        console.log('!!!!!!');
        let tmpArr = [];
        let tmpStatus = '';
        let oneRoomsList = [];
        let roomsCount = 0;
        for (let i = 0; i < size[0]; i++) {
            for (let j = 0; j < size[1]; j++) {
                if (map[i][j] !== 0) {
                    tmpArr = [];
                    tmpStatus = Math.floor(Math.random() * states.length);
                    switch (map[i][j]) {
                        case 4:
                            tmpArr = [1, 1, 1, 1];
                            break;
                        case 3:
                            if (i === 0) {
                                tmpArr = [0, 1, 1, 1];
                            } else if (i === size[0] - 1) {
                                tmpArr = [1, 1, 0, 1];
                            } else if (j === 0) {
                                tmpArr = [1, 1, 1, 0];
                            } else if (j === size[1] - 1) {
                                tmpArr = [1, 0, 1, 1];
                            } else {
                                if (map[i - 1][j] === 0) {
                                    tmpArr = [0, 1, 1, 1];
                                } else if (map[i][j + 1] === 0) {
                                    tmpArr = [1, 0, 1, 1];
                                } else if (map[i + 1][j] === 0) {
                                    tmpArr = [1, 1, 0, 1]
                                } else {
                                    tmpArr = [1, 1, 1, 0];
                                }
                            }
                            break;
                        case 2:
                            if (i > 0 && map[i - 1][j] !== 0) {
                                tmpArr.push(1);
                            } else {
                                tmpArr.push(0);
                            }
                            if (j < size[1] - 1 && map[i][j + 1] !== 0) {
                                tmpArr.push(1);
                            } else {
                                tmpArr.push(0);
                            }
                            if (i < size[0] - 1 && map[i + 1][j] !== 0) {
                                tmpArr.push(1);
                            } else {
                                tmpArr.push(0);
                            }
                            if (j > 0 && map[i][j - 1] !== 0) {
                                tmpArr.push(1);
                            } else {
                                tmpArr.push(0);
                            }
                            break;
                        case 1:
                            if (i > 0 && map[i - 1][j] !== 0) {
                                tmpArr = [1, 0, 0, 0];
                            } else if (j < size[1] - 1 && map[i][j + 1] !== 0) {
                                tmpArr = [0, 1, 0, 0];
                            } else if (i < size[0] - 1 && map[i + 1][j] !== 0) {
                                tmpArr = [0, 0, 1, 0];
                            } else {
                                tmpArr = [0, 0, 0, 1];
                            }
                            oneRoomsList.push(roomsCount);
                            break;
                    }
                    roomsMap.push({'status': states[tmpStatus], 'active': 'hidden', 'arr': tmpArr});
                } else {
                    roomsMap.push({'status': 'hidden', 'active': '', 'arr': []});
                }
                roomsCount++;
            }
        }
        let tmpI = Math.floor(Math.random() * oneRoomsList.length);
        roomsMap[oneRoomsList[tmpI]].status = 'exit';
        oneRoomsList.splice(tmpI, 1);
        tmpI = Math.floor(Math.random() * oneRoomsList.length);
        roomsMap[oneRoomsList[tmpI]].active = 'active';
        roomsMap[oneRoomsList[tmpI]].status = 'default';
        // заносим получившиеся комнаты в список (чтобы потом соотносить номер с типом)
        roomsMap.map(
            (value, index) => {
                if (value.status !== 'hidden')
                    store.dispatch(addRoomOnList('index', index, 'type', value.status))}
        );
        store.dispatch(handleVisitRoom('index', oneRoomsList[tmpI]));
    }

    //setRoomsList(currRoomsList => roomsMap);
    init();
    let widthCave = (220 + 20)*5;
    stateCave = store.getState();

    //store.subscribe(handleChange);
    //player.subscribe(handleChange);
    //unsubscribe();
    /*
    popupFields['status'] = '';
        popupFields['defaultTitle'] = 'Welcome!';
        popupFields['defaultText'] = 'Your adventure starting!';
        setPopup(currPopup => popupFields);
     */
    let modalPopup = <ModalAction keu='main_popup' status='' defaultText='Your adventure starting!' defaultTitle='Welcome!' />

    const activeRoomIndex = stateCave['rooms']['room']['index'];
    return (
        <>
            <Player />
            <div className='cave' style={{ width: widthCave }}>
                {roomsMap.map((value, index) =>
                    <Room
                        status={value.status}
                        doorArr={value.arr}
                        key={index}
                        active={activeRoomIndex === index ? 'active' : 'hidden'}
                        roomsIndex={index}
                        flag='init'
                    />
                )}
                {modalPopup}
            </div>
        </>
    )
}

export default Cave;