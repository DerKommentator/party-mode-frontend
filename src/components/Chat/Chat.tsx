import React, {createContext, useCallback, useContext, useEffect, useState} from "react";
import "./Chat.scss"
import SocketProvider from "../../socket_context";
import ChatInput from "./ChatInput/ChatInput";
import ChatHistory from "./ChatHistory/ChatHistory";
import ChatOptions from "./ChatOptions/ChatOptions";
import {SocketContext} from "../../socket_context/context";


const Chat = () => {
    const socket = useContext(SocketContext);
    const [chatHistory, setChatHistory] = useState<MessageEvent[]>([]);
    const [username, setUsername] = useState("");
    const invalidInput = new RegExp("^\\s*$");
    
    const connect = useCallback(() => {
        console.log("connecting");

        socket.onopen = () => {
            console.log("Successfully Connected");
            socket.send(username);
        }

        socket.onmessage = msg => {
            console.log("Message Received:", msg);
            setChatHistory(lastMessage => [...lastMessage, msg]);
        }

        socket.onclose = event => {
            console.log("Socket Closed Connection: ", event);
        };

        socket.onerror = error => {
            console.log("Socket Error: ", error);
        };
    }, [socket, username])


    useEffect(() => {
        connect();
    })

    const onFormSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            username: { value: string }
        };

        if (target.username.value !== undefined && !invalidInput.test(target.username.value)) {
            console.log(target.username.value)
            setUsername(target.username.value);
            target.username.value = "";
        }
    }

    
    return (
        <div className={"chat-wrapper"}>
            {
                username !== "" ? (
                        <SocketProvider>
                            <div className={"chat__history"}>
                                <ChatHistory chatHistory={chatHistory}/>
                            </div>
                            <div className={"chat__input"}>
                                <ChatInput />
                            </div>
                            <div>
                                <ChatOptions />
                            </div>
                        </SocketProvider>
                ) : (
                    <form onSubmit={onFormSubmit}>
                        <input name="username" />
                        <input type="submit" value="Set Username" />
                    </form>
                )
            }
        </div>

    )
}

export default Chat;