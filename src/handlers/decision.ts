import clients from "../clients.js";
import type { DecisionMessage } from "../types.js";



export function handleDecision(message: DecisionMessage): void {

    console.log(`Decision recibida: ${message.action} (id: ${message.id})`);


    if (!clients.raspberry || clients.raspberry.readyState !== 1) {
        console.warn("Raspberry no conectada, no se pudo enviar decision.");
        return
    }

    clients.raspberry.send(JSON.stringify({
        type: "decision",
        action: message.action,
        id: message.id
    }))
}