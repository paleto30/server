import clients from "../clients.js";
import type { AppSocket, RegisterMessage } from "../types.js";


export function handleRegister(socket: AppSocket, message: RegisterMessage): void {

    socket.role = message.role

    if (message.role === "raspberry") {
        clients.raspberry = socket
        console.log(" Raspberry conectada");
    } else if (message.role === "web") {
        clients.web.add(socket)
        console.log(`Navegador conectado (total: ${clients.web.size})`);
    }
}