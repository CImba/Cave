import './Room.css';
import {useState, useEffect} from "react";
import store from "../store/cave/store";
import {handleVisitRoom, openNewRoom} from "../store/cave/actions";
import player from "../store/player/store";
import {changePlayerState} from "../store/player/actions";
import ModalAction from "./ModalAction";

function Room({status = 'hidden', doorArr, active = '', roomsIndex, flag = ''}) {
    const doorName = ['door door-top', 'door door-right', 'door door-bottom', 'door door-left'];
    const[stateRoom, setStateRoom] = useState('hidden');
    let popupFields = {
        status: 'hidden',
        defaultTitle: '',
        defaultText: ''
    }
    const[popup, setPopup] = useState(popupFields);
    const enemyList = [
        'Troll', 'Goblin', 'Skeleton', 'Zombie', 'Dark eyes', 'Mim'
    ];


    function setStateCurrentRoom() {
        let stateCave = store.getState();
        let currentRoom = {
            'index' : stateCave['rooms']['room']['index'],
            'type' : stateCave['rooms']['room']['type']
        };

        if (roomsIndex === currentRoom['index'] && stateRoom !== 'player') {
            setStateRoom(currStateRoom => 'player');
            if (stateCave['rooms']['action'] === 'change curr room') {
                if (isNewRoom()) {
                    console.log('show message');
                    onCreateMessage();
                    console.log('popup');
                }
            }
        }
        else if (roomsIndex !== currentRoom['index'] && stateRoom === 'player')
            setStateRoom(currStateRoom => 'visited');
    }

    const handleDoorsClick = (param, index) => {
        let stateCave = store.getState();
        // кликабельные двери только в активной комнате
        if (stateCave['rooms']['room']['index'] === roomsIndex) {
            // переносим комнату в список открытых
            store.dispatch(openNewRoom());
            // определяем в какую сторону должны переместиться
            let newIndex = -1;
            if (index % 2 === 0) {
                // 0 | 2 (up | down)
                newIndex = roomsIndex - ((-1 * index) + 1) * stateCave['rooms']['caveSize'][1];
            } else {
                // 1 | 3 (right | left)
                newIndex = roomsIndex - (index - 2);
            }
            // открываем новую комнату
            store.dispatch(handleVisitRoom('index', newIndex));
        }
    }

    function handleChangeRoom() {
        let stateCave = store.getState();
        let currentRoom = stateCave['rooms']['room']['index'];
        if (currentRoom === roomsIndex || stateRoom === 'player')
            setStateCurrentRoom();
    }

    function onFighting(enemy, player) {
        let actionsList = ['bite', 'miss', 'block'];
        let tmpAction = 0;
        let tmp = -1;
        while (enemy['HP'] > 0 && player['HP'] > 0) {
            tmpAction = Math.floor(Math.random() * actionsList.length);
            if (tmp > 0) {
                // enemy round
                if (actionsList[tmpAction] === 'bite') {
                    player['HP'] = parseInt(player['HP'] - enemy['attack']);
                }
            } else {
                // player round
                enemy['HP'] = parseInt(enemy['HP'] - player['attack']);
            }
            tmp = tmp * (-1);
        }
        if (enemy['HP'] > 0) {
            return [-1, 'You loose'];
        } else {
            return [1, 'You win', player['HP']];
        }
    }
    function onCreateMessage() {
        let stateCave = store.getState();
        let statePlayer = player.getState();
        let messageTeh = 'You in ' + stateCave['rooms']['room']['index'] + "room. This room is " + stateCave['rooms']['room']['type'];
        let randCharacter;
        let message = '';
        let title = '';
        let newStatePlayer = {
            'health': statePlayer['player']['health'],
            'attack': statePlayer['player']['attack']
        };
        let currStatePlayer = {
            'health': statePlayer['player']['health'],
            'attack': statePlayer['player']['attack']
        };
        switch (stateCave['rooms']['room']['type']) {
            case 'empty': {
                message = "It's gray but safe place";
                newStatePlayer = currStatePlayer;
                break;
            }
            case 'default': {
                message = "It's gray but safe place";
                newStatePlayer = currStatePlayer;
                break;
            }
            case 'treasure': {
                title = "Congratulation!";
                message = "You find treasure! ";
                randCharacter = Math.floor(Math.random() * 2);
                let tmp;
                if (randCharacter === 1) {
                    tmp = Math.floor(Math.random() * 10 + 1);
                    message = message + "Your attack up on " + tmp + " point";
                    newStatePlayer['attack'] = parseInt(tmp + currStatePlayer['attack']);
                    //player.dispatch(changePlayerState('attack', parseInt(tmp + currStatePlayer['attack'])));
                } else {
                    tmp = Math.floor(Math.random() * 100 + 10);
                    message = message + "Your health up on " + tmp + " point";
                    newStatePlayer['health'] = parseInt(tmp + currStatePlayer['health']);
                    //player.dispatch(changePlayerState('health', parseInt(tmp + currStatePlayer['health'])));
                }
                break;
            }
            case 'fight': {
                title = "Attention!";
                let tmp = Math.floor(Math.random() * enemyList.length);
                let enemyHealth = Math.floor(Math.random() * (statePlayer['player']['health'] - statePlayer['player']['attack'] * 2) + 10);
                let enemyAttack = Math.floor(Math.random() * (statePlayer['player']['attack'] + 1) + 1);
                message = "You find enemy! It's " + enemyList[tmp] + " with " + enemyHealth + " health and " + enemyAttack + " attack Your make win.";
                let answer = onFighting({
                    'HP': parseInt(enemyHealth),
                    'attack': parseInt(enemyAttack)
                }, {
                    'HP': parseInt(statePlayer['player']['health']),
                    'attack': parseInt(statePlayer['player']['attack'])
                });
                console.log('fighting');
                console.log(answer);
                if (answer[0] > 0) {
                    newStatePlayer['health'] = parseInt(answer[2]);
                } else {
                    newStatePlayer['health'] = parseInt('0');
                }
                break;
            }
            case 'exit': {
                title = "Congratulation!";
                message = "You find exit!";
                newStatePlayer = currStatePlayer;
                break;
            }
            default: {
                message = "Something wrong!";
                newStatePlayer = currStatePlayer;
                break;
            }
        }

        popupFields['status'] = '';
        popupFields['defaultTitle'] = title;
        popupFields['defaultText'] = message;
        setPopup(currPopup => popupFields);
        if (currStatePlayer['health'] !== newStatePlayer['health']) {
            player.dispatch(changePlayerState('health', newStatePlayer['health']));
        }
        if (currStatePlayer['attack'] !== newStatePlayer['attack']) {
            player.dispatch(changePlayerState('attack', newStatePlayer['attack']));
        }
    }
    function isNewRoom() {
        let cave = store.getState();
        let roomsList = cave['rooms']['roomsOpenedList'];
        let room = cave['rooms']['room'];
        for (let i = 0; i < roomsList.length; i = i + 1) {
            if (room['index'] === roomsList[i]['index'])
                return false;
        }
        return true;
    }

    let roomsClass = 'room ' + 'room--' + status + ' room--' + stateRoom;
    let doorsArr = [];
    let tmp = '';
    for (let i = 0; i < 4; i++) {
        if (doorArr[i] === 1) {
            let key = {roomsIndex} + '_' + i;
            tmp = <span key={key} className={doorName[i]} onClick={() => handleDoorsClick(roomsIndex, i)}></span>;
            doorsArr.push(tmp);
        }
    }

    store.subscribe(handleChangeRoom);
    if (flag === 'init') {
        setStateCurrentRoom();
    }
    //console.log('before render | stateRoom - ' + stateRoom + '  // modal - ' + popup['status'] + ' /// init - ' + flag);
    let modalPopup;
    let key = {roomsIndex} + '__modal';
    if (popup['status'] !== 'hidden') {
        modalPopup = <ModalAction key={key} status={popup['status']} defaultText={popup['defaultText']} defaultTitle={popup['defaultTitle']} />
    }
    return (
        <>
            <div className={roomsClass}>
                {doorsArr}
                <span>{roomsIndex}</span>
            </div>
            {modalPopup}
        </>
    )
}

export default Room;