import { SlashCommandBuilder } from 'discord.js';

const create = () => {
	let command = new SlashCommandBuilder()
		.setName('stop')
		.setDMPermission(false)
		.setDescription('stop all the music!')
		.setDescriptionLocalizations({
			'en-US': 'stop all the music!',
			'pt-BR': 'pare todas as música!',
		});
	return command.toJSON();
};

const KellyWorld = async (client, interaction, lang) => {
	if (!interaction.member.voice.channel)
		return interaction.reply({
			content: `${lang('language:music.novoice')}`,
			ephemeral: true,
		});

	if (
		interaction.guild.members.me.voice?.channel &&
		interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId
	)
		return interaction.reply({
			content: `${lang('language:music.nomevoice')}`,
			ephemeral: true,
		});

	const stop = client.vulkava.players.get(interaction.guild.id);

	if (!stop?.playing)
		return interaction.reply({
			content: `${lang('language:music.nomusic')}`,
			ephemeral: true,
		});

	stop.destroy();

	interaction.reply({
		content: `${lang('language:music.stop')}`,
		ephemeral: true,
	});
};

export { create, KellyWorld };
