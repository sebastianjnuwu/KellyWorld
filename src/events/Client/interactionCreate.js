import { InteractionType, PermissionFlagsBits } from 'discord.js';
import i18next from 'i18next';

export default {
	async exec(client, interaction) {
		const GUILD = await client.db.guild.findOne({
			_id: interaction.guild.id,
		});

		if (!GUILD)
			return await client.db.guild.create({
				_id: interaction.guild.id,
			});

		let lang = GUILD.lang || 2;

		switch (lang) {
			case 1:
				lang = i18next.getFixedT('pt-BR');
				break;
			case 2:
				lang = i18next.getFixedT('en-US');
				break;
		}

		if (
			!interaction.guild.members.me.permissions.has(
				PermissionFlagsBits.Administrator,
			)
		)
			return interaction.reply({
				content: `${lang('language:nopermission')}`,
				ephemeral: true,
			});

		if (interaction.type === InteractionType.ApplicationCommand)
			(await import(`#commands/${interaction.commandName}`)).KellyWorld(
				client,
				interaction,
				lang,
			);
	},
	name: 'interactionCreate',
	type: 'on',
};
