import { type VoiceState, ChannelType, OverwriteType } from "discord.js";
import { Event } from "../../structures/Event";

const tempChannels = new Map<string, string>();

export default new Event("voiceStateUpdate", async (oldState: VoiceState, newState: VoiceState) => {
  const member = newState.member;
  const guild = newState.guild;
  const joinChannel = newState.channel;
  const leaveChannel = oldState.channel;

  const triggerChannelId = "1332058835803836447";

  if (joinChannel?.id === triggerChannelId && member) {

    const channel = await guild.channels.create({
      name: `👥┃${member.displayName}`,
      type: ChannelType.GuildVoice,
      userLimit: 10,
      parent: joinChannel.parentId ?? undefined,
      permissionOverwrites: [
        {
          id: member.id,
          allow: ["ManageChannels"],
          type: OverwriteType.Member,
        },
      ]
    });

    tempChannels.set(member.id, channel.id);
    await member.voice.setChannel(channel);
  }
if (leaveChannel?.name.startsWith("👥┃") && leaveChannel.members.size === 0) {
    await leaveChannel.delete().catch(() => { });
  }

});