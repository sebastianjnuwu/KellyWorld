import type { Awaitable, ChatInputApplicationCommandData, ChatInputCommandInteraction, Message } from "discord.js";
import type { SoulKitten } from "./Client";
import i18next, { type TFunction } from "i18next";
import type CommandContext from "./CommandContext";

interface ExecuteOptions {
  context: CommandContext;
  interaction: ChatInputCommandInteraction | Message;
  client: SoulKitten;
  lang: TFunction;
}

export type CommandType = {
  exec: (opts: ExecuteOptions) => Awaitable<void>;
  owner?: boolean;
  dm_permission?: boolean;
  description_localizations?: { [key: string]: string };
} & ChatInputApplicationCommandData;

export class Command {
  constructor(commandOptions: CommandType) {
    Object.assign(this, commandOptions);
  }
}
