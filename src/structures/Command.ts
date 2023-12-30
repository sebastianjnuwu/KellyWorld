import { Awaitable, ChatInputApplicationCommandData } from "discord.js";
import { KellyWorld } from "./Client";
import CommandContext from "./CommandContext";

interface ExecuteOptions {
	context: CommandContext;
	client: KellyWorld;
}

export type CommandType = {
	exec: (opts: ExecuteOptions) => Awaitable<any>;
	owner?: boolean;
	aliases?: string[];
	prefix?: boolean;
} & ChatInputApplicationCommandData;

export class Command {
	constructor(commandOptions: CommandType) {
		Object.assign(this, commandOptions);
	}
}
