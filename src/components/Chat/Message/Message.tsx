import React, {useEffect, useRef, useState} from "react";
import "./Message.scss";

interface IMessage {
    client_id: string
    client_username: string,
    message: string
}

const Message = (props: {messageObject: IMessage}) => {
    //const [messageObject, setMessageObject] = useState<IMessage>(data);

    /*useEffect(() => {
        console.log("<Message>", messageObject);
    }, [messageObject])*/

    return (
        <div className={"message"}>
            <p><b>{props.messageObject.client_username}</b>: {props.messageObject.message}</p>
        </div>
    )
}

export default Message;