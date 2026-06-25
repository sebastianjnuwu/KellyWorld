import {
    type VoiceState,
    ChannelType,
    OverwriteType,
} from "discord.js";
import { Event } from "../../structures/Event";

/**
 * Armazena a relação entre o ID do usuário e o ID
 * do canal temporário criado para ele.
 */
const tempChannels = new Map<string, string>();

export default new Event(
    "voiceStateUpdate",
    /**
     * Gerencia a criação e remoção de canais de voz temporários.
     *
     * Quando um usuário entra no canal gatilho, um novo canal de voz
     * é criado automaticamente e o usuário é movido para ele.
     *
     * Quando um canal temporário fica vazio, ele é removido.
     *
     * @param oldState Estado de voz anterior do usuário.
     * @param newState Estado de voz atual do usuário.
     */
    async (oldState: VoiceState, newState: VoiceState) => {
        const member = newState.member;
        const guild = newState.guild;
        const joinChannel = newState.channel;
        const leaveChannel = oldState.channel;

        /**
         * ID do canal utilizado para criar canais temporários.
         */
        const triggerChannelId = "1517987266545451068";

        if (joinChannel?.id === triggerChannelId && member) {
            /**
             * Cria um novo canal de voz temporário para o usuário.
             */
            const channel = await guild.channels.create({
                name: `👥┃${member.displayName}`,
                type: ChannelType.GuildVoice,
                userLimit: 10,
                parent: "1517986848126009517",
                permissionOverwrites: [
                    {
                        id: member.id,
                        allow: ["ManageChannels"],
                        type: OverwriteType.Member,
                    },
                ],
            });

            tempChannels.set(member.id, channel.id);

            /**
             * Sincroniza as permissões do canal com a categoria pai.
             */
            await channel.lockPermissions();

            /**
             * Move o usuário para o canal recém-criado.
             */
            await member.voice.setChannel(channel);
        }

        /**
         * Remove o canal temporário quando não houver mais membros nele.
         */
        if (
            leaveChannel?.name.startsWith("👥┃") &&
            leaveChannel.members.size === 0
        ) {
            await leaveChannel.delete().catch(() => { });
        }
    },
)