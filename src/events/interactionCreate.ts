/* eslint-disable consistent-return */
import colors from "colors";
import {
	ApplicationCommandOptionType,
	AutocompleteInteraction,
	ChatInputCommandInteraction,
	GuildMember,
	Interaction,
} from "discord.js";
import { request } from "undici";
import client from "../main";
import CommandContext from "../structures/CommandContext";
import { Event } from "../structures/Event";

export default new Event(
	"interactionCreate",
	async (interaction: Interaction) => {
		if (interaction instanceof ChatInputCommandInteraction) {
			const command = client.commands.get(interaction.commandName);

			if (!command) return;

			if (command.owner && !["id"].some((id) => interaction.user.id === id))
				return;

			const args = [];

			for (const option of interaction.options.data) {
				if (option.type === ApplicationCommandOptionType.Subcommand) {
					if (option.name) args.push(option.name);
					option.options?.forEach((x) => {
						if (x.value) args.push(x.value);
					});
				} else if (option.value) args.push(option.value);
			}

			const context = new CommandContext(client, interaction, args);

			client.logger.info(
				`Command ${colors.blue(command.name)} used in ${colors.blue(
					context.guild ? context.guild.name : "DM",
				)} by ${colors.blue(context.user.username)}`,
				{
					tags: ["Command"],
				},
			);
			try {
				await command.exec({
					context,
					client,
				});
			} catch (err) {
				if (err instanceof Error) {
					await context
						.reply({
							content:
								"**☝️ There was a error while executing this command, i already reported it for my developers please be patient while is gets solved!**",
							ephemeral: true,
						})
						.catch(() => {});
					client.logger.warn(`Error in command ${command.name}\n${err.stack}`, {
						tags: ["Command"],
					});
				}
			}
		}
	},
);
