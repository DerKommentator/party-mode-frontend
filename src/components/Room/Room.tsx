import React, {useReducer, useState} from 'react';
import "./Room.scss";
import ReactPlayer from "react-player";
import Chat from "../Chat/Chat";
import {socket} from "../../socket_context/context";

interface Progress {
    loaded: number,
    loadedSeconds: number,
    played: number,
    playedSeconds: number
}

const Room = () => {
    const playerRef = React.createRef<ReactPlayer>();
    const [videoStates, setVideoStates] = useReducer(
        (videoStates: any, newVideoStates: any) => ({...videoStates, ...newVideoStates}),
        {
        url: null,
        pip: false,
        playing: false,
        controls: true,
        light: false,
        volume: 0.8,
        muted: false,
        played: 0.0,
        playedSeconds: 0.0,
        loaded: 0,
        loadedSeconds: 0.0,
        duration: 0,
        playbackRate: 1.0,
        loop: false,
        seeking: false
    })

    const _onReady = (event: any) => {
        event.target.pauseVideo();
    }

    const sendVideoStates = () => {
        console.log("sending videoSyncProcess:", videoStates);
        socket.emit("videoSyncProcess", videoStates);
    }

    const handleProgress = (state: Progress) => {
        console.log('onProgress', state.playedSeconds);
        setVideoStates(state);

        sendVideoStates();
    }

    const handleSeekMouseDown = (e: any) => {
        setVideoStates({ seeking: true });
    }

    const handleSeekChange = (e: any) => {
        setVideoStates({ played: parseFloat(e.target.value) });
    }

    const handleSeekMouseUp = (e: any) => {
        setVideoStates({ seeking: false });
        playerRef?.current?.seekTo(parseFloat(e.target.value));
        console.log("seeked to:", videoStates.playedSeconds);
    }

    const onBuffer = () => {
        console.log("played:", videoStates.playedSeconds);
    }

    return (
        <div>
            <div className="player-wrapper">
                <ReactPlayer
                    ref={playerRef}
                    className='react-player'
                    width='80%'
                    height='80%'
                    url='https://www.youtube.com/watch?v=G4dkLMj6GRQ'
                    onProgress={handleProgress}
                    onReady={() => console.log('onReady')}
                    controls={videoStates.controls}
                    onBuffer={onBuffer}
                    onPause={() => {
                        videoStates.playing = false;
                        sendVideoStates();
                        return;
                    }}
                    onPlay={() => {
                        videoStates.playing = true;
                        sendVideoStates();
                        return;
                    }}
                />
            </div>
            <div className="chat">
                <Chat />
            </div>
        </div>
    )
}

export default Room;