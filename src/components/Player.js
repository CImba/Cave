import './Player.css';
import player from "../store/player/store";
import {useState} from "react";

function Player() {
    let statePlayer = player.getState();
    let newStatePlayer = {
        'health': statePlayer['player']['health'],
        'attack': statePlayer['player']['attack']
    };
    const[playerStatus, setPlayerStatus] = useState(newStatePlayer);

    function handleChange() {
        console.log('//////      player handle change      //////');
        let statePlayer = player.getState();
        console.log(statePlayer['player']['health'] + ' / ' + statePlayer['player']['attack']);
        let newStatePlayer = {
            'health': statePlayer['player']['health'],
            'attack': statePlayer['player']['attack']
        };
        setPlayerStatus(currPlayerStatus => newStatePlayer);
    }

    player.subscribe(handleChange);
    console.log('update player');
    console.log(statePlayer['player']['health'] + ' / ' + statePlayer['player']['attack']);

    return (
        <>
            <div className='player'>
                <div className='player--state health'>{playerStatus['health']}</div>
                <div className='player--state attack'>{playerStatus['attack']}</div>
            </div>
        </>
    )
}

export default Player;