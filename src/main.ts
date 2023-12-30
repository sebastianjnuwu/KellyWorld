import { KellyWorld } from "./structures/Client";

const Client = new KellyWorld();
Client.init();

/*
process.on('uncaughtException', () => {});
process.on('unhandledRejection', () => {});
*/

export default Client;
