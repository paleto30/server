import dotenv from 'dotenv'
import express from "express";
import http from "http"
import { WebSocketServer } from "ws";
import type { AppSocket } from "./types.js";
import { routeMessage } from "./handlers/index.js";
import clients from "./clients.js";

const app = express()

dotenv.config()

const httpServer = http.createServer(app)

const wss = new WebSocketServer({ server: httpServer })


wss.on("connection", (rawSocket) => {

    const socket = rawSocket as AppSocket
    console.log("🔗 Nueva conexión entrante");

    socket.on("message", (data) => {
        try {
            const message = JSON.parse(data.toString());
            routeMessage(socket, message);
        } catch {
            console.error("❌ JSON inválido:", data.toString());
        }
    });


    socket.on("close", () => {
        if (socket.role === "raspberry") {
            clients.raspberry = null;
            console.log("🔌 Raspberry desconectada");
        } else if (socket.role === "web") {
            clients.web.delete(socket);
            console.log(`🔌 Navegador desconectado (total: ${clients.web.size})`);
        }
    });

    socket.on("error", (err) => {
        console.error("❌ Error en socket:", err.message);
    });

})


const port = Number(process.env.PORT);

if (!port) {
    throw new Error("PORT no está definido");
}

httpServer.listen(port, '0.0.0.0', () => {
    console.log(`🚀 Servidor en http://0.0.0.0:${port}`);
});