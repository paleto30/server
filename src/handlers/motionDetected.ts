import clients from "../clients.js";


export function handleMotionDetected(): void {

    console.log("Movimiento detectado, notificando navegadores...");

    const payload = JSON.stringify({
        type: "new_request",
        id: Date.now().toString(),
        timestamp: new Date().toISOString()
    })

    clients.web.forEach(client => {
        if (client.readyState === 1) {
            client.send(payload)
        }
    })
}