export default {
	async exec(client, player, track) {
		const channel = client.channels.cache.get(player.textChannelId);

channel.send(`♪⁠┌⁠|⁠∵⁠|⁠┘⁠♪ \`${track.title}\` >> <#${player.voiceChannelId}>`);
	},
	name: 'trackStart',
	type: 'vulkava',
};
