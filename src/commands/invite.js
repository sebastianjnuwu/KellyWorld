import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

const create = () => {
	let command = new SlashCommandBuilder()
		.setName('invite')
		.setDMPermission(false)
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
		.setDescription('block invites from discord servers')
		.setDescriptionLocalizations({
			'en-US': 'block invites from discord server',
			'pt-BR': 'bloquear convites de servidores do discord',
		})
		.addStringOption(option =>
			option
				.setName('select')
				.setNameLocalizations({
					'en-US': 'select',
					'pt-BR': 'selecionar',
				})
				.setDescription('Do you want to block invites from discord servers?')
				.setDescriptionLocalizations({
					'en-US': 'Do you want to block invites from discord servers?',
					'pt-BR': 'Deseja bloquear convites de servidores do discord?',
				})
				.setRequired(true)
				.addChoices(
					{
						name: 'activated',
						value: 'true',
					},
					{
						name: 'disabled',
						value: 'false',
					},
				),
		);
	return command.toJSON();
};

const KellyWorld = async (client, interaction, lang) => {
	const value = interaction.options.getString('select');

	await client.db.guild.findOneAndUpdate(
		{
			_id: interaction.guild.id,
		},
		{
			$set: {
				invite: value,
			},
		},
	);

	if (value) {
		interaction.reply({
			content: `${lang('language:block-invite.activated')}`,
			ephemeral: true,
		});
	} else {
		interaction.reply({
			content: `${lang('language:block-invite.disabled')}`,
			ephemeral: true,
		});
	}
};

export { create, KellyWorld };
