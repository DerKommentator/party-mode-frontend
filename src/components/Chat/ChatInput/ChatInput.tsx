import React, {FC, useCallback, useContext, useState} from "react";
import "./ChatInput.scss"
import {SocketContext} from "../../../socket_context/context";
import ChatHistory from "../ChatHistory/ChatHistory";

interface FormMessage {
    username: { value: string },
    message: { value: string }
}

const ChatInput = () => {
    const socket = useContext(SocketContext);
    const [textareaRows, setTextareaRows] = useState(1);
    const invalidInput = new RegExp("^\\s*$");

    const sendMsg = (msg: string) => {
        console.log("sending message:", msg);
        socket.emit("message", msg);
    }

    const onFormSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const target = event.target as typeof event.target & FormMessage;

        if (target !== undefined && !invalidInput.test(target.message.value)) {
            sendMsg(target.message.value);
            target.message.value = "";
            setTextareaRows(1);
        }
    }

    const resizeTextarea = (event: React.SyntheticEvent) => {
        const target = event.target as HTMLTextAreaElement;
        const charsPerLine = 34;
        const rows = Math.ceil(target.value.length / charsPerLine);
        if (rows < 5) {
            setTextareaRows(rows);
        } else {
            setTextareaRows(5);
        }

        if (target.value.length === 0) {
            setTextareaRows(1);
        }
    }

    return(
        <div>
            <form onSubmit={onFormSubmit}>
                <textarea className={"input-field"} name="message" wrap="soft" maxLength={500} rows={textareaRows} onChange={resizeTextarea} />
                <button className={"input-button"} type="submit">Chat</button>
            </form>

        </div>
    );
}

export default ChatInput;