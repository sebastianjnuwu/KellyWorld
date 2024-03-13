import { Event } from "../structures/Event";
import client from "../main";
import colors from "colors";

export default new Event('guildDelete', async (guild) => {
  
  await client.db.guild.findFirst({
   where: {
     id: guild.id
   }
  }).then(async (result) => {
   if (!result) return;
   await client.db.guild.delete({
     where: {
       id: guild.id
     }
   });
   client.logger.info(`Removed from server ${colors.red(guild.name)} with id: ${colors.blue(guild.id)}`, { tags: ["Bot"]});
  });
  
});