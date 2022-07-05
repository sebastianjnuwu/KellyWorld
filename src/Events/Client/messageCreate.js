import i18next from 'i18next';
import Day from 'dayjs';

export default {
  name: 'messageCreate',
  async exec(client, message) {
  
  if (message.author.bot || !message.guild) return;
    
  let prefix;
  
  let GUILD = await client.db.guild.findOne({
      _id: message.guild.id,
    });

  if (!GUILD) GUILD = await client.db.guild.create({
      _id: message.guild.id,
    });

 if (message.content.toLowerCase().startsWith('kelly')) {
      prefix = 'kelly';
    } else {
      prefix = GUILD.prefix;
    }
  
  if (!message.content.toLowerCase().startsWith(prefix)) return;

  const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);
  
  let t = GUILD.lang || 1;
 
  switch(t) {
    case 1:
      t = i18next.getFixedT('pt-BR');
      break;
    case 2:
      t = i18next.getFixedT('en-US');
      break;
    }

  if (cmd.length === 0) return;

  const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

  if (!command) return;
  
  if(command.ownerOnly && !client.owners.some(id => id === message.author.id)) return;
  
  const d = msg => setTimeout(() => { msg.delete().catch(() => {}); message.delete().catch(() => {})}, 10000);
    
  await command.exec({ client, message, args, d, t });
 
  }
};