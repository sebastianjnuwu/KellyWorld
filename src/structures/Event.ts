import { Awaitable, ClientEvents } from "discord.js";

export class Event<Key extends keyof ClientEvents> {
	constructor(
		public name: Key,
		public exec: (...args: ClientEvents[Key]) => Awaitable<any>,
	) {}
}
