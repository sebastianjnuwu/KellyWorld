import colors from 'colors';

export default {
  name: 'ready',
  async exec(client,message) {
  
  // console message when bot is powered on...
 console.log(colors.brightGreen("[Info] - ") + `${client.user.tag} was started in ${client.guilds.cache.size} servers!`);
 console.log(colors.brightGreen("[Info] - ") + `Having access to ${client.channels.cache.size} channels!`);
 console.log(colors.brightGreen("[Info] - ") + `Containing ${client.users.cache.size} users!`);
 
 // bot activity status.....
   let status = [
     `KettraWorld - Instagram Follow us: @kettraworld`,
     `KettraWorld - Kelly help`,
     `KettraWorld - Playing minecraft`,
     `KettraWorld - Looking after ${client.users.cache.size} players`
  ];
 
  let i = 0;

  setInterval(() => {
  client.user.setActivity(`${status[i++ % status.length]}`, { type: 1 });
  }, 3000 * 60 ); 

  }
};