import { SlashCommandBuilder } from 'discord.js';

const create = () => {
 let command = new SlashCommandBuilder()
  .setName('play')
  .setDMPermission(false)
  .setDescription('want to hear a song?')
  .setDescriptionLocalizations({
    "pt-BR": 'quer ouvir uma música?',
    "en-US": 'want to hear a song?',
    "es-ES": '¿quieres escuchar una canción?',
  }).addStringOption(option => option
   .setName('nombre')
   .setNameLocalizations({
      "pt-BR": 'nome',
      "en-US": 'nombre',
      "es-ES": 'nombre',
    })
    .setRequired(true)
		.setDescription('What is the name of the song?')
    .setDescriptionLocalizations({
      "pt-BR": 'Qual é o nome da música?',
      "en-US": 'What is the name of the song?',
      "es-ES": '¿Cuál es el nombre de la canción?',
  }),
	);
  return command.toJSON();
};

const KellyWorld = async (client, interaction, lang) => {

  if (!interaction.member.voice.channel) return interaction.reply({ content: `${lang('language:music.novoice')}`, ephemeral: true });

  if (interaction.guild.members.me.voice?.channel && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) return interaction.reply({ content: `${lang('language:music.nomevoice')}`, ephemeral: true });

  const track = interaction.options.getString('nombre');

  await interaction.reply({ content: `${lang('language:music.search', { track: track })}`});

  const res = await client.vulkava.search(track);

  if (res.loadType === "LOAD_FAILED") {
   return interaction.editReply({ content: `${lang('language:music.failed')}` });
  } else if (res.loadType === "NO_MATCHES") {
  return interaction.editReply({ content: `${lang('language:music.matches')}` });
  }

  const player = client.vulkava.createPlayer({
    guildId: interaction.guild.id,
    voiceChannelId: interaction.member.voice.channelId,
    textChannelId: interaction.channel.id,
    selfDeaf: true,
  });

  player.connect();

  if (res.loadType === 'PLAYLIST_LOADED') {
    for (const track of res.tracks) {
      track.setRequester(interaction.user);
      player.queue.add(track);
    }

   interaction.editReply({ content: `${lang('language:music.playlist', { music: res.playlistInfo.name })}` });

  } else {
    const track = res.tracks[0];
    track.setRequester(interaction.user);

    player.queue.add(track);
    interaction.editReply({ content: `${lang('language:music.toc', { music: track.title })}` });
  }

  if (!player.playing) player.play();

};

export {
  create, KellyWorld,
};