import Day from 'dayjs';
import colors from 'colors';

export default {
  name: 'guildDelete',
  async exec (client, guild) {

    console.log(colors.brightRed('[Info] - ') + `Data: ${Day(Date.now()).format('DD/MM/YYYY HH:mm:ss')} Fui removido do servidor: ${guild.name}`);
 
    await client.db.guild.findOneAndDelete({ _id: guild.id }).catch(() => {});

  }
}; 