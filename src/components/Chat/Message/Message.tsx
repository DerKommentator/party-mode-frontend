import React, {useEffect, useState} from "react";
import "./Message.scss";

interface props {
    messageEvent: MessageEvent;
}

const Message = ({messageEvent}: props) => {
    const [message, setMessage] = useState(JSON.parse(messageEvent.data));

    
    return (
        <div className={"message"}>
            {message.client_username}: {message.body}
        </div>
    )
}

export default Message;