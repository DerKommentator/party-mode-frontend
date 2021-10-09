import React, {FC, useContext, useState} from "react";
import "./ChatInput.scss"
import {SocketContext} from "../../../socket_context/context";
import ChatHistory from "../ChatHistory/ChatHistory";

interface FormMessage {
    username: { value: string },
    message: { value: string }
}

const ChatInput = () => {
    const socket = useContext(SocketContext);
    const invalidInput = new RegExp("^\\s*$");

    const sendMsg = (msg: string) => {
        console.log("sending message:", msg);
        socket.send(msg);
    }

    const onFormSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const target = event.target as typeof event.target & FormMessage;

        if (target !== undefined && !invalidInput.test(target.message.value)) {
            sendMsg(target.message.value);
            target.message.value = "";
        }
    }

    return(
        <div>
            <form onSubmit={onFormSubmit}>
                <input className={"input-field"} name="message" />
                <button className={"input-button"} type="submit">Chat</button>
            </form>

        </div>
    );
}

export default ChatInput;