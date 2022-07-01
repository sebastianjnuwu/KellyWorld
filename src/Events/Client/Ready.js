import colors from 'colors';

export default {
  name: 'ready',
  async exec(client,message) {
  
  // console message when bot is powered on!
 console.log(colors.brightGreen("[Info]")+` ${client.user.tag} was started in ${client.guilds.cache.size} servers!`);
 console.log(colors.brightGreen("[Info]")+` having access to ${client.channels.cache.size} channels!`);
 console.log(colors.brightGreen("[Info]")+` containing ${client.users.cache.size} users!`);
 
 // bot activity status
 setInterval(() => { 
      client.user.setActivity(`Kelly - ${client.guilds.cache.size.toLocaleString()} Servers` , { type: ActivityType.Watching });
    }, 60 * 60 * 1000);
  }
}; 