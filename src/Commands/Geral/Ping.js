
export default {
  name: 'ping',
  aliases: ['ping'],
  ownerOnly: false,
  async exec({ client, message }) {
    
    
    const gateway = Date.now() - message.createdTimestamp;
    const hours = Math.floor(client.uptime / 3600000) % 24;
    const minutes = Math.floor(client.uptime / 60000) % 60;
    const seconds = Math.floor(client.uptime / 1000) % 60;

    message.reply({ content: `**🏓 Pong!**\n> :zap: **Api ping** › __${client.ws.ping}__ms\n> :stopwatch: **Gateway Ping** › __${gateway}__ms\n> 📡 **Shards** ›   __${message.guild.shard.id + 1}/${client.ws.shards.size}__\n> :hourglass_flowing_sand: **Uptime** › __${hours}__ hours, __${minutes}__ minutes and __${seconds}__ seconds`});
   
  }
};