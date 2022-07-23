import Day from 'dayjs';
import colors from 'colors';

export default { 
  name: 'guildCreate',
  async exec (client, guild) {

    console.log(colors.brightGreen('[Info]') + ` Data: ${Day(Date.now()).format('DD/MM/YYYY HH:mm:ss')} Fui adicionada no servidor: ${guild.name}`);

  }
};