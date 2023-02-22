import i18next from 'i18next';

export default {
    async exec(client, player, track) {
        const GUILD = await client.db.guild.findOne({
            _id: player.guildId,
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

        const channel = client.channels.cache.get(player.textChannelId);

        channel
            .send(
                `${lang('language:music.start', {
                    title: track.title,
                    channel: player.voiceChannelId,
                    emoji: '<:music_start:1077979239007125594>',
                })}`,
            )
            .then(m => {
                m.react('🐦');
            });
    },
    name: 'trackStart',
    type: 'vulkava',
};
