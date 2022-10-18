// importing the necessary packages.
import i18next from 'i18next';

// exporting the event 
export default {
  name: 'messageCreate',
  async exec(client, message) {
  
    // bot's don't use commands or run nana dm do bot!
    if (message.author.bot || !message.guild) return;
  
    // define the prefix?
    let prefix;
  
    // looking up user information in the database.
    let USER = await client.db.user.findOne({
      _id: message.author.id,
    });
    
    // fetching information from that server in the database.
    let GUILD = await client.db.guild.findOne({
      _id: message.guild.id,
    });
  
    // in case the server is not in the database now be!
    if (!GUILD) GUILD = await client.db.guild.create({
      _id: message.guild.id,
    });
  
    // we take the prefix like "Kelly" or "&" which is the default!
    if (message.content.toLowerCase().startsWith('kelly')) {
      prefix = 'kelly';
    } else {
      prefix = GUILD.prefix;
    }
  
    // taking the prefix in tiny
    if (!message.content.toLowerCase().startsWith(prefix)) return;
  
    // if the user does not have it in the database now it will be!
    if (!USER) USER = await client.db.user.create({ _id: message.author.id });
  
    // taking the prefix along with the word in front!
    const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);
  
    // variable "t" is for language, the default language is Portuguese!
    let t = GUILD.lang || 1;
 
    // varieval "t" has a value like this matching the following
    switch(t) {
    case 1:
      t = i18next.getFixedT('pt-BR');
      break;
    case 2:
      t = i18next.getFixedT('en-US');
      break;
    }
  
    // if you just put the prefix, don't return anything!
    if (cmd.length === 0) return;
  
    // looking for his command and alias!
    const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

    // if the command does not exist, it does not return anything!
    if (!command) return;
  
    // to drill commands for common users (only important people can execute)
    if (command.ownerOnly && !client.owners.some(id => id === message.author.id)) return;
  
    // executing command and the accompanying variables!
    await command.exec({ client, message, args, t });
 
  }
};