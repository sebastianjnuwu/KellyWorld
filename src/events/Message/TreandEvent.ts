import { type Message, ChannelType } from "discord.js";
import { Event } from "../../structures/Event";

export default new Event(
    "messageCreate",
    async (message: Message) => {

        if (message.author.bot) return;

        const targetChannelId = "1446985968115777637";

        if (message.channel.id !== targetChannelId) return;

        const thread = await message.startThread({
            name: `Duvida de(a) ${message.author.username}`,
            autoArchiveDuration: 10080, // 7 dias
        });

        await thread.send(`Olá ${message.author}, este é o seu tópico de dúvidas! Sinta-se à vontade para perguntar aqui.`);
    },
);
