export default {
  name: 'guildMemberAdd',
  async exec (client, member) {
  
    const channel = member.guild.channels.cache.get('971817175650291772');
  
    if (!channel) return;
    channel.send(`${member} _Seja bem vindo(a) a_ **KettraWorld**`).then(k => { 
      setTimeout(() => {
        k.delete().catch(() => {});
      }, 35000);
    });
  }
};
