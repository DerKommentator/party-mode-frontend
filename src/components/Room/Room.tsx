import React from 'react';
import "./Room.scss";
import ReactPlayer from "react-player";
import Chat from "../Chat/Chat";

const Room = () => {

    function _onReady(event: any) {
        event.target.pauseVideo();

    }

    function handleProgress(state: any) {
        console.log('onProgress', state)
    }

    return (
        <div>
            <div className="player-wrapper">
                <ReactPlayer
                    className='react-player'
                    width='80%'
                    height='80%'
                    url='https://www.youtube.com/watch?v=G4dkLMj6GRQ'
                    onProgress={handleProgress}
                    onReady={() => console.log('onReady')}
                />
            </div>
            <div className="chat">
                <Chat />
            </div>
        </div>
    )
}

export default Room;