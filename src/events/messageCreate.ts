import { GuildMember } from "discord.js";
import client from "../main";
import CommandContext from "../structures/CommandContext";
import { Event } from "../structures/Event";
import colors from "colors";

export default new Event("messageCreate", async (message) => {
	if (!message.inGuild || message.author.bot) return;

	let prefix: string;

	const mentionRegex = message.content.match(
		new RegExp(`^<@!?(${client.user.id})>`, "gi"),
	);

	if (message.content.match(new RegExp(`^<@!?(${client.user.id})>`, "gi"))) {
		prefix = String(mentionRegex);
	} else if (message.content.toLowerCase().startsWith("Kelly")) {
		prefix = "Kelly";
	} else {
		prefix = "!";
	}

	if (
		message.content === `<@${client.user.id}>` ||
		message.content === `<@${client.user.id}>`
	) {
		message.reply({
			content: `**Hello,** my name is **Kelly** and my prefix in this server is **!** but you also can use my **[/] Slash Commands**!`,
		});
	}

	if (!message.content.toLowerCase().startsWith(prefix)) return;

	const [cmd, ...args] = message.content
		.slice(prefix.length)
		.trim()
		.split(/ +/g);
	if (cmd.length === 0) return;
	const command =
		client.commands.get(cmd.toLowerCase()) ||
		client.commands.get(client.aliases.get(cmd.toLowerCase()));

	if (!command) return;

	if (!command.prefix) {
		return message.reply({
			content:
				"**☝️ This command is only avaliable via `[/] Slash Commands` type `/` to see more.**",
		});
	}

	if (command.owner && !["id"].some((id) => message.author.id === id)) return;

	const context = new CommandContext(client, message, args);

	client.logger.info(
		`Command ${colors.blue(command.name)} used in ${colors.blue(
			context.guild.name,
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
				})
				.catch(() => {});
			client.logger.warn(`Error in command ${command.name}\n${err.stack}`, {
				tags: ["Command"],
			});
		}
	}
});
