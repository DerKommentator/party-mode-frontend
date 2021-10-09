import React, {FC} from "react";
import { SocketContext, socket } from "./context";

const SocketProvider:FC = (props) => {
    
    return(
        <SocketContext.Provider value={ socket }>
            { props.children }
        </SocketContext.Provider>
    )
};
export default SocketProvider;