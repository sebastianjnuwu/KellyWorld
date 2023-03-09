export default {
	name: 'guildMemberAdd',
	type: 'on',
	async exec(client, member) {
		const channel = member.guild.channels.cache.get('971817175650291772');

		if (!channel) return;

		channel.messages.fetch('1083434072413577326').then(m =>
			m.reply(`${member} _Seja bem vindo(a) a_ **KettraWorld**`).then(k => {
				setTimeout(() => {
					k.delete().catch(() => {});
				}, 35000);
			}),
		);
	},
};
