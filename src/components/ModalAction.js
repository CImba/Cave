import './ModalAction.css';
import store from "../store/cave/store";
import {useState} from "react";
import {changePlayerState} from "../store/player/actions";
import player from "../store/player/store";

function ModalAction({status = '', defaultTitle = '', defaultText = ''}) {
    const[stateModal, setStateModal] = useState(status);
    const[modalTitle, setModalTitle] = useState(defaultTitle);
    const[modalText, setModalText] = useState(defaultText);
    const[modalMessage, setModalMessage] = useState('');

    function closeModal(event) {
        event.preventDefault();
        console.log('close modal');
        setStateModal(currStateModal => 'hidden');
        //stateModal = 'hidden';
    }
    // function fighting(enemy, player) {
    //     console.log('fighting    enemy / player');
    //     console.log(enemy);
    //     console.log(player);
    //     let actionsList = ['bite', 'miss', 'block'];
    //     let tmpAction = 0;
    //     let tmp = -1;
    //     while (enemy['HP'] > 0 && player['HP'] > 0) {
    //         tmpAction = Math.floor(Math.random() * actionsList.length);
    //         if (tmp > 0) {
    //             // enemy round
    //             if (actionsList[tmpAction] === 'bite') {
    //                 player['HP'] = parseInt(player['HP'] - enemy['attack']);
    //             }
    //         } else {
    //             // player round
    //             enemy['HP'] = parseInt(enemy['HP'] - player['attack']);
    //         }
    //         tmp = tmp * (-1);
    //     }
    //     if (enemy['HP'] > 0) {
    //         return [-1, 'You loose'];
    //     } else {
    //         return [1, 'You win', player['HP']];
    //     }
    // }
    // function handleChangeRoomForModal() {
    //     let stateCave = store.getState();
    //     console.log('check modal action - ' + stateCave['rooms']['action']);
    //     if (stateCave['rooms']['action'] === 'change curr room') {
    //         let visitedRoomsList = stateCave['rooms']['roomsOpenedList'];
    //         let currRoom = stateCave['rooms']['room'];
    //         let index = 0;
    //         while (index < visitedRoomsList.length) {
    //             if (currRoom['index'] === visitedRoomsList[index]['index'])
    //                 index = visitedRoomsList.length + 1;
    //             else
    //                 index = index + 1;
    //         }
    //         if (index < visitedRoomsList.length + 1) {
    //             let statePlayer = player.getState();
    //             let messageTeh = 'You in ' + stateCave['rooms']['room']['index'] + "room. This room is " + stateCave['rooms']['room']['type'];
    //             //setMessageModal(currMessage => messageTeh);
    //             let randCharacter;
    //             let message = '';
    //             let title = '';
    //             let newStatePlayer = {
    //                 'health': statePlayer['player']['health'],
    //                 'attack': statePlayer['player']['attack']
    //             };
    //             let currStatePlayer = {
    //                 'health': statePlayer['player']['health'],
    //                 'attack': statePlayer['player']['attack']
    //             };
    //             switch (stateCave['rooms']['room']['type']) {
    //                 case 'empty': {
    //                     message = "It's gray but safe place";
    //                     newStatePlayer = currStatePlayer;
    //                     break;
    //                 }
    //                 case 'default': {
    //                     message = "It's gray but safe place";
    //                     newStatePlayer = currStatePlayer;
    //                     break;
    //                 }
    //                 case 'treasure': {
    //                     title = "Congratulation!";
    //                     message = "You find treasure! ";
    //                     randCharacter = Math.floor(Math.random() * 2);
    //                     let tmp;
    //                     if (randCharacter === 1) {
    //                         tmp = Math.floor(Math.random() * 10 + 1);
    //                         message = message + "Your attack up on " + tmp + " point";
    //                         newStatePlayer['attack'] = parseInt(tmp + currStatePlayer['attack']);
    //                         //player.dispatch(changePlayerState('attack', parseInt(tmp + currStatePlayer['attack'])));
    //                     } else {
    //                         tmp = Math.floor(Math.random() * 100 + 10);
    //                         message = message + "Your health up on " + tmp + " point";
    //                         newStatePlayer['health'] = parseInt(tmp + currStatePlayer['health']);
    //                         //player.dispatch(changePlayerState('health', parseInt(tmp + currStatePlayer['health'])));
    //                     }
    //                     break;
    //                 }
    //                 case 'fight': {
    //                     title = "Attention!";
    //                     let tmp = Math.floor(Math.random() * enemyList.length);
    //                     let enemyHealth = Math.floor(Math.random() * (statePlayer['player']['health'] - statePlayer['player']['attack'] * 2) + 10);
    //                     let enemyAttack = Math.floor(Math.random() * (statePlayer['player']['attack'] + 1) + 1);
    //                     message = "You find enemy! It's " + enemyList[tmp] + " with " + enemyHealth + " health and " + enemyAttack + " attack Your make win.";
    //                     let answer = fighting({
    //                         'HP': parseInt(enemyHealth),
    //                         'attack': parseInt(enemyAttack)
    //                     }, {
    //                         'HP': parseInt(statePlayer['player']['health']),
    //                         'attack': parseInt(statePlayer['player']['attack'])
    //                     });
    //                     console.log('fighting');
    //                     console.log(answer);
    //                     if (answer[0] > 0) {
    //                         //player.dispatch(changePlayerState('health', parseInt(answer[2])));
    //                         newStatePlayer['health'] = parseInt(answer[2]);
    //                     } else {
    //                         newStatePlayer['health'] = parseInt('0');
    //                     }
    //                     break;
    //                 }
    //                 case 'exit': {
    //                     title = "Congratulation!";
    //                     message = "You find exit!";
    //                     newStatePlayer = currStatePlayer;
    //                     break;
    //                 }
    //                 default: {
    //                     message = "Something wrong!";
    //                     newStatePlayer = currStatePlayer;
    //                     break;
    //                 }
    //             }
    //             //setTitleModal(currTitle => title);
    //             //setTextModal(currText => message);
    //             setModalMessage(currModalMessage => messageTeh);
    //             setModalTitle(currModalTitle => title);
    //             setModalText(currModalText => message);
    //             setStateModal(currStateModal => '');
    //             console.log('! update player from modal !');
    //             console.log(currStatePlayer['health'] + ' / ' + newStatePlayer['health']);
    //             console.log(currStatePlayer['attack'] + ' / ' + newStatePlayer['attack']);
    //             if (currStatePlayer['health'] !== newStatePlayer['health']) {
    //                 player.dispatch(changePlayerState('health', newStatePlayer['health']));
    //             }
    //             if (currStatePlayer['attack'] !== newStatePlayer['attack']) {
    //                 player.dispatch(changePlayerState('attack', newStatePlayer['attack']));
    //             }
    //         }
    //     }
    // }
    let modalClass = "wrapper-modal";
    modalClass += (stateModal !== '') ?  " modal-status--" + stateModal : '';

    //store.subscribe(handleChangeRoomForModal);

    return (
        <>
            <div className={modalClass}>
                <div className='modal'>
                    <a href="#" onClick={closeModal} className='modal-close'>x</a>
                    <p className='title'>{modalTitle}</p>
                    <p>{modalText}</p>
                    <p>{modalMessage}</p>
                    <div className='modal-buttons'>
                        <a href="#" className='button' onClick={closeModal}>ok</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalAction;