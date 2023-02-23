export default {
    async exec(client, player) {
        const channel = client.channels.cache.get(player.textChannelId);

        channel.send(`🐦`);

        player.destroy();
    },
    name: 'queueEnd',
    type: 'vulkava',
};
