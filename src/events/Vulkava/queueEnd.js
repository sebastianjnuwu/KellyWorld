export default {
  name: 'queueEnd',
  type: 'vulkava',
  async exec(client, player) {

  const channel = client.channels.cache.get(player.textChannelId);

  channel.send(`Fila encerrada!`);

  player.destroy();

  },
};