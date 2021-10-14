import React, {useEffect, useRef, useState} from "react";
import "./Message.scss";

interface IMessage {
    client_id: string
    client_username: string,
    message: string
}

const Message = (data: IMessage) => {
    const [messageObject, setMessageObject] = useState<IMessage>(data);

    return (
        <div className={"message"}>
            <p><b>{messageObject.client_username}</b>: {messageObject.message}</p>
        </div>
    )
}

export default Message;