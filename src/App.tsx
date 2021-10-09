import React from 'react';
import './App.scss';
import ReactPlayer from "react-player";
import Chat from "./components/Chat/Chat";

function App() {

    function _onReady(event: any) {
        event.target.pauseVideo();

    }

    function handleProgress(state: any) {
        console.log('onProgress', state)
    }

  return (
    <div className={"app"}>
        <Chat />
        <div className="player-wrapper">
            {/*<ReactPlayer
                className='react-player'
                width='100%'
                height='100%'
                url='https://www.youtube.com/watch?v=G4dkLMj6GRQ'
                onProgress={handleProgress}
                onReady={() => console.log('onReady')}
            />*/}
        </div>
    </div>
  );
}

export default App;
