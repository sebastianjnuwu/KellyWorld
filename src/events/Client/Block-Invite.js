import i18next from 'i18next';

export default {
	name: 'messageCreate',
	type: 'on',
	async exec(client, message) {
		if (!message.guild) return;

		const GUILD = await client.db.guild.findOne({
			_id: message.guild.id,
		});

		if (!GUILD) return;

		let t = GUILD.lang || 2;

		switch (t) {
			case 1:
				t = i18next.getFixedT('pt-BR');
				break;
			case 2:
				t = i18next.getFixedT('en-US');
				break;
		}

		if (GUILD.invite && message.member) {
			if (message.member.permissions.has('ManageMessages')) return;

			const isInvite = str =>
				/dis(?:board\.org\/(?:pl\/)?server\/join|cord(?:\.me\/server\/join|(?:app\.com\/invite|\.(?:com\/invite|gg\/))))/gi.test(
					str,
				);

			if (isInvite(message.content)) {
				message.channel
					.send(
						`${t('language:block-invite.msg', {
							user: String(message.author),
						})}`,
					)
					.then(msg => setTimeout(() => msg.delete(), 30000));

				message.delete().catch(() => {});
			}
		}
	},
};
