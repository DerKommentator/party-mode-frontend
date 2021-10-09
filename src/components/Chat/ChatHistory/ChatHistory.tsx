import React, {createRef, useContext, useEffect, useRef, useState} from "react";
import {SocketContext} from "../../../socket_context/context";
import Message from "../Message/Message";

const ChatHistory = (props: any) => {
    const [messages, setMessages] = useState<MessageEvent[]>([])
    const socket = useContext(SocketContext);
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom();

        setMessages(props.chatHistory)
    }, [props.chatHistory, messages])

    return(
        <div>
            {
                messages.map((msg, index) => (
                    <Message key={index} messageEvent={msg} />
                ))
            }
            <div ref={messagesEndRef} />
        </div>
    );
}

export default ChatHistory;