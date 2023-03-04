import { TicketOpen, TicketClose, TicketDelete, TicketReopen } from '#ticket';

export default {
    async exec(client, interaction) {
        if (interaction.customId) {
            const search = await client.db.ticket.findOne({
                id: interaction.user.id,
                guild: interaction.guild.id,
            });

            if (search) {
                const channel = interaction.guild.channels.cache.get(
                    search.channel,
                );

                if (!channel)
                    await client.db.ticket.deleteOne({
                        channel: search.channel,
                        guild: interaction.guild.id,
                    });
            }

            switch (interaction.customId) {
                case 'ticket-abert':
                    TicketOpen(interaction, client);
                    break;

                case 'ticket-close':
                    TicketClose(interaction, client);
                    break;

                case 'ticket-reopen':
                    TicketReopen(interaction, client);
                    break;

                case 'ticket-delete':
                    TicketDelete(interaction, client);
                    break;
            }
        }
    },
    name: 'interactionCreate',
    type: 'on',
};
