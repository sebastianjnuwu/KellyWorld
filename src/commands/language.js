import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

const create = () => {
    let command = new SlashCommandBuilder()
        .setName('language')
        .setNameLocalizations({
            'en-US': 'language',
            'pt-BR': 'idioma',
        })
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDescription('Select a language for your server...')
        .setDescriptionLocalizations({
            'en-US': 'Select a language for your server...',
            'pt-BR': 'Selecione um idioma para o seu servidor...',
        })
        .addStringOption(option =>
            option
                .setName('select')
                .setNameLocalizations({
                    'en-US': 'select',
                    'pt-BR': 'selecionar',
                })
                .setDescription('What is your preferred language?')
                .setDescriptionLocalizations({
                    'en-US': 'What is your preferred language?',
                    'pt-BR': 'Qual é o seu idioma preferido?',
                })
                .setRequired(true)
                .addChoices(
                    {
                        name: '🇧🇷 Português',
                        value: '1',
                    },
                    {
                        name: '🇺🇸 English',
                        value: '2',
                    },
                ),
        );
    return command.toJSON();
};

const KellyWorld = async (client, interaction) => {
    const value = interaction.options.getString('select');

    await client.db.guild.findOneAndUpdate(
        {
            _id: interaction.guild.id,
        },
        {
            $set: {
                lang: value,
            },
        },
    );

    if (value == 1)
        return interaction.reply({
            content: `(^^) Você fala este idioma não é? legal!`,
            ephemeral: true,
        });

    if (value == 2)
        return interaction.reply({
            content: `(^^) You speak this language don't you? Cool!`,
            ephemeral: true,
        });
};

export { create, KellyWorld };
