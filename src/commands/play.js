import { SlashCommandBuilder } from 'discord.js';

const create = () => {
	let command = new SlashCommandBuilder()
		.setName('play')
		.setDMPermission(false)
		.setDescription('want to hear a song?')
		.setDescriptionLocalizations({
			'en-US': 'want to hear a song?',
			'pt-BR': 'quer ouvir uma música?',
		})
		.addStringOption(option =>
			option
				.setName('nombre')
				.setNameLocalizations({
					'en-US': 'nombre',
					'pt-BR': 'nome',
				})
				.setRequired(true)
				.setDescription('What is the name of the song?')
				.setDescriptionLocalizations({
					'en-US': 'What is the name of the song?',
					'pt-BR': 'Qual é o nome da música?',
				}),
		);
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
		interaction.member.voice.channelId !==
			interaction.guild.members.me.voice.channelId
	)
		return interaction.reply({
			content: `${lang('language:music.nomevoice')}`,
			ephemeral: true,
		});

	const track = interaction.options.getString('nombre');

	await interaction.reply({
		content: `${lang('language:music.search', { track: track })}`,
		ephemeral: true,
	});

	const res = await client.vulkava.search(track);

	if (res.loadType === 'LOAD_FAILED') {
		return interaction.editReply({
			content: `${lang('language:music.failed')}`,
			ephemeral: true,
		});
	} else if (res.loadType === 'NO_MATCHES') {
		return interaction.editReply({
			content: `${lang('language:music.matches')}`,
			ephemeral: true,
		});
	}

	const player = client.vulkava.createPlayer({
		guildId: interaction.guild.id,
		selfDeaf: true,
		textChannelId: interaction.channel.id,
		voiceChannelId: interaction.member.voice.channelId,
	});

	player.connect();

	if (res.loadType === 'PLAYLIST_LOADED') {
		for (const track of res.tracks) {
			track.setRequester(interaction.user);
			player.queue.add(track);
		}

		interaction.editReply({
			content: `${lang('language:music.playlist', {
				music: res.playlistInfo.name,
			})}`,
			ephemeral: true,
		});
	} else {
		const track = res.tracks[0];
		track.setRequester(interaction.user);

		player.queue.add(track);
		interaction.editReply({
			content: `${lang('language:music.toc', { music: track.title })}`,
			ephemeral: true,
		});
	}

	if (!player.playing) player.play();
};

export { create, KellyWorld };
