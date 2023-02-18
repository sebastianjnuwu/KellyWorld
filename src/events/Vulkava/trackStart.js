export default {
  name: 'trackStart',
  type: 'vulkava',
  async exec(client, player, track) {

  const channel = client.channels.cache.get(player.textChannelId);

  channel.send(`♪⁠┌⁠|⁠∵⁠|⁠┘⁠♪ \`${track.title}\``);

  },
};