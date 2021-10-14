import React, {createRef, useContext, useEffect, useRef, useState} from "react";
import {SocketContext} from "../../../socket_context/context";
import Message from "../Message/Message";
import ScrollToBottom, { useScrollToBottom, useSticky } from 'react-scroll-to-bottom';

interface Response {
    data: any
}

const ChatHistory = (props: any) => {
    const [messages, setMessages] = useState<Response[]>([])
    const socket = useContext(SocketContext);
    const messagesEndRef = useRef<HTMLDivElement>(null)



    const AlwaysScrollToBottom = () => {
        const elementRef = useRef<HTMLDivElement>(null);
        useEffect(() => {
            elementRef.current?.scrollIntoView({ behavior: "auto" });
        });

        return <div ref={elementRef} />;
    };

    useEffect(() => {
        setMessages(props.chatHistory);
    }, [props.chatHistory])

    return(
            <div>
                {
                    messages.map((msg, index) => (
                        <Message
                            key={index}
                            message={msg.data.message}
                            client_username={msg.data.client_username}
                            client_id={msg.data.client_id}
                        />
                    ))
                }
                <AlwaysScrollToBottom />
            </div>
    );
}

export default ChatHistory;