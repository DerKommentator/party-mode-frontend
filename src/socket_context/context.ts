import {createContext} from "react";

interface IWsClient {
    ws: WebSocket;
    eventListener: any;
    on: (eventName: string, cb: (data: any) => void) => void;
    emit: (name: string, data: Object) => void;
}

const WsClient = function (this: IWsClient, url: string) {
    this.ws = new WebSocket(url);
    this.eventListener = {};

    this.on = (eventName: string, cb: (data: any) => void) => {
        this.eventListener[eventName] = cb;
    }

    this.emit = (name: string, data: Object) => {
        let event = {
            event: name,
            data: data,
        };

        let rawData = JSON.stringify(event);
        this.ws.send(rawData);
    }

    this.ws.onmessage = (response: MessageEvent) => {
        try {
            let data = JSON.parse(response.data);
            if (data) {
                let cb = this.eventListener[data.event];
                if (cb) {
                    delete data["event"];
                    cb(data);
                }
            }
        } catch (e) {
            console.log(e);
        }
    }
} as any as { new (url: string): IWsClient; };

export const socket = new WsClient("ws://localhost:8080/ws");
export const SocketContext = createContext(socket);