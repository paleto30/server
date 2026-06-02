import type { AppSocket, IncomingMessage } from "../types.js";
import { handleDecision } from "./decision.js";
import { handleMotionDetected } from "./motionDetected.js";
import { handleRegister } from "./register.js";
import { handleRequestCancelled } from "./requestCancelled.js";



type Handler = (socket: AppSocket, message: IncomingMessage) => void


const raspberryHandlers: Partial<Record<IncomingMessage["type"], Handler>> = {
    motion_detected: (_socket, _msg) => handleMotionDetected(),
    request_cancelled: (_socket, _msg) => handleRequestCancelled()
}


const webHandlers: Partial<Record<IncomingMessage["type"], Handler>> = {
    decision: (_socket, _msg) => handleDecision(_msg as any)
}

export function routeMessage(socket: AppSocket, message: IncomingMessage): void {
    if (message.type === "register") {
        return handleRegister(socket, message as any)
    }

    const handlerMap = socket.role === "raspberry" ? raspberryHandlers : webHandlers
    const handler = handlerMap[message.type]

    if (handler) {
        handler(socket, message)
    } else {
        console.warn(`⚠️ Mensaje desconocido — tipo: ${message.type}, rol: ${socket.role}`)
    }
}