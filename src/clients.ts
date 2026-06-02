import type { AppSocket } from "./types.js";


interface Clients {
    raspberry: AppSocket | null
    web: Set<AppSocket>
}

const clients: Clients = {
    raspberry: null,
    web: new Set()
}


export default clients