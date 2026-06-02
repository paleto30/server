

export type Role = "raspberry" | "web"

export type MessageType =
    | "register"
    | "motion_detected"
    | "request_cancelled"
    | "decision"


export interface BaseMessage {
    type: MessageType
}


export interface RegisterMessage extends BaseMessage {
    type: "register"
    role: Role
}

export interface MotionDetectedMessage extends BaseMessage {
    type: "motion_detected";
}

export interface RequestCancelledMessage extends BaseMessage {
    type: "request_cancelled";
}

export interface DecisionMessage extends BaseMessage {
    type: "decision";
    action: "accept" | "reject";
    id: string;
}


export type IncomingMessage =
    | RegisterMessage
    | MotionDetectedMessage
    | RequestCancelledMessage
    | DecisionMessage;


import { WebSocket } from "ws"


export interface AppSocket extends WebSocket {
    role?: Role
}