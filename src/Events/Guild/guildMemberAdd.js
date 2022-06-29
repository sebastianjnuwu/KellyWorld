
export default {
  name: 'guildMemberAdd',
  async exec (client, member) {
  
  const channel = member.guild.channels.cache.get('991506128972304414');
  
  if (!channel) return;
  channel.send(`${member} _Seja bem vindo(a) a_ **KettraWorld**`).then(k => { 
    setTimeout(() => {
      k.delete().catch(() => {});
      }, 35000);
    });
  }
};