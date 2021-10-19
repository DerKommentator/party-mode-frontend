import React, {createRef, useContext, useEffect, useRef, useState} from "react";
import {SocketContext} from "../../../socket_context/context";
import Message from "../Message/Message";

interface Response {
    data: any
}

const ChatHistory = (props: { chatHistory: Response[] }) => {
    //const [messages, setMessages] = useState<Response[]>([])
    const socket = useContext(SocketContext);
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const AlwaysScrollToBottom = () => {
        const elementRef = useRef<HTMLDivElement>(null);
        useEffect(() => {
            elementRef.current?.scrollIntoView({ behavior: "auto" });
        });

        return <div ref={elementRef} />;
    };

    return(
            <div>
                {
                    props.chatHistory.map((msg, index) => (
                        msg !== undefined &&
                        <Message
                            key={index}
                            messageObject={msg.data}
                        />
                    ))
                }
                <AlwaysScrollToBottom />
            </div>
    );
}

export default ChatHistory;