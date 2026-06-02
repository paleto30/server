import clients from "../clients.js";


export function handleRequestCancelled(): void {
    console.log(" Solicitud cancelada por Raspberry");

    const payload = JSON.stringify({ type: "request_cancelled" })

    clients.web.forEach(client => {
        if (client.readyState === 1) {
            client.send(payload)
        }
    })
}