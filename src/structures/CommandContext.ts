import {
  ChatInputCommandInteraction,
  type Guild,
  type GuildMember,
  type InteractionReplyOptions,
  Message,
  type BaseMessageOptions,
  type TextChannel,
  type User,
} from "discord.js";
import type { SoulKitten } from "./Client";

export default class CommandContext {
  public client: SoulKitten;
  public readonly args: string[];
  public interaction: Message | ChatInputCommandInteraction;

  constructor(
    client: SoulKitten,
    interaction: Message | ChatInputCommandInteraction,
    args: string[] = [],
  ) {
    this.client = client;
    this.interaction = interaction;
    this.args = args;
  }

  public reply(
    opts: BaseMessageOptions | InteractionReplyOptions,
  ): Promise<unknown> {
    if (this.interaction instanceof ChatInputCommandInteraction) {
      if (this.interaction.replied) {
        return this.interaction.followUp(
          Object.assign(opts, {
            withResponse: true,
          }) as InteractionReplyOptions,
        );
      }
      if (this.interaction.deferred) {
         // @ts-ignore
        return this.interaction.editReply(
          Object.assign(opts, {
            withResponse: true,
          }) as InteractionReplyOptions,
        );
      }
      return this.interaction.reply(
        Object.assign(opts, { withResponse: true }) as InteractionReplyOptions,
      );
    }
    if (this.interaction instanceof Message) {
      return this.interaction.reply(opts as BaseMessageOptions);
    }
  }

  public get subCommand(): string | boolean {
    if (this.interaction instanceof ChatInputCommandInteraction) {
      return this.interaction.options.getSubcommand();
    }
    return false;
  }

  public get user(): User {
    if (this.interaction instanceof Message) {
      return this.interaction.author;
    }
    return this.interaction.user;
  }

  public get guild(): Guild {
    return this.interaction.guild;
  }

  public get guildId(): string {
    return this.interaction.guild.id;
  }

  public get member(): GuildMember {
    return this.interaction.member as GuildMember;
  }

  public get channel(): TextChannel {
    return this.interaction.channel as TextChannel;
  }
}
