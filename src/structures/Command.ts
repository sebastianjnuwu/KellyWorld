import { Awaitable, ChatInputApplicationCommandData } from "discord.js";
import { KellyWorld } from "./Client";
import i18next, { TFunction } from 'i18next';
import CommandContext from "./CommandContext";

interface ExecuteOptions {
	context: CommandContext;
	client: KellyWorld;
	lang: TFunction;
}

export type CommandType = {
	exec: (opts: ExecuteOptions) => Awaitable<any>;
	owner?: boolean;
	player?: boolean;
	dm_permission?: boolean;
  description_localizations?: { [key: string]: string };
} & ChatInputApplicationCommandData;

export class Command {
	constructor(commandOptions: CommandType) {
		Object.assign(this, commandOptions);
	}
}
