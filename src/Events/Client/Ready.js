import colors from 'colors';

export default {
  name: 'ready',
  async exec(client,message) {
  
  // console message when bot is powered on!
 console.log(colors.brightGreen("[Info]")+` ${client.user.tag} was started in ${client.guilds.cache.size} servers!`);
 console.log(colors.brightGreen("[Info]")+` having access to ${client.channels.cache.size} channels!`);
 console.log(colors.brightGreen("[Info]")+` containing ${client.users.cache.size} users!`);
 
 // bot activity status
 let activities = [ 'Kelly help - ${client.guilds.cache.size} servers!' ];
 let i = 0;
 setInterval(() => 
 client.user.setActivity(`${activities[i++ % activities.length]}`, { type: "PLAYING", url: "https://www.twitch.tv/sebastianjnuwu" }), 8000); 
  }
}; 