import React, {createContext, useCallback, useContext, useEffect, useState} from "react";
import "./Chat.scss"
import SocketProvider from "../../socket_context";
import ChatInput from "./ChatInput/ChatInput";
import ChatHistory from "./ChatHistory/ChatHistory";
import ChatOptions from "./ChatOptions/ChatOptions";
import {SocketContext} from "../../socket_context/context";

interface Response {
    data: any
}

const Chat = () => {
    const socket = useContext(SocketContext);
    const [chatHistory, setChatHistory] = useState<Response[]>([]);
    const [userRegistered, setUserRegistered] = useState(false);
    const invalidInput = new RegExp("^\\s*$");
    
    const connect = useCallback(() => {
        console.log("connecting");

        socket.ws.onopen = () => {
            console.log("Successfully Connected");
        }

        socket.on("registered", (data: any) => {
            console.log("User registered:", data.data);
            setUserRegistered(true);
        })

        socket.on("response", (data: any) => {
            console.log("response:", data)
            setChatHistory(lastMessage => [...lastMessage, data]);
        })

        /*socket.ws.onmessage = msg => {
            //console.log("Message Received:", msg);
            setChatHistory(lastMessage => [...lastMessage, msg]);
        }*/

        socket.ws.onclose = event => {
            console.log("Socket Closed Connection: ", event);
        };

        socket.ws.onerror = error => {
            console.log("Socket Error: ", error);
        };
    }, [socket])


    useEffect(() => {
        connect();
    }, [])

    const onFormSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            username: { value: string }
        };

        if (target.username.value !== undefined && !invalidInput.test(target.username.value)) {
            console.log("Register User:", target.username.value);
            socket.emit("register", target.username.value);

            target.username.value = "";
        }
    }

    /*return (
        <div className={"chat-wrapper"}>
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
        </div>
    )*/
    
    return (
        <div className={"chat-wrapper"}>
            {
                userRegistered ? (
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