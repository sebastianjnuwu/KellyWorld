// ♥️ project creator: Sebastian Jn (╯°□°）╯︵ ┻━┻

// all packages used in the project
const { fs, colors, dotenv } = require("kettraworld.db"); 
const Discord = require("discord.js");
const client = new Discord.Client({intents: 14071});
const config = require("./config.json");
client.login(process.env.token); // login 

// anticlash just after server to keep our application online even if errors occur internally with codes or external connections!
process.on('unhandledRejection', (reason, p) => {    
       console.log(' [ ANTICLASH ] | SCRIPT REJEITADO');    
       console.log(reason, p);
});
    
process.on("uncaughtException", (err, origin) => {
        console.log(' [ ANTICLASH] | CATCH ERROR');
        console.log(err, origin);
});

process.on('uncaughtExceptionMonitor', (err, origin) => {
        console.log(' [ ANTICLASH ] | BLOQUEADO');
        console.log(err, origin);
});

process.on('multipleResolves', (type, promise, reason) => {
        console.log(' [ ANTICLASH ] | VÁRIOS ERROS');
        console.log(type, promise, reason);
}); 

// activity status of our bot
client.on("ready", () => {
  let activities = [ `Minecraft em Kettra World 🌟`, `Minecraft: caçando os deuses ^^ `]
    i = 0;
  setInterval( () => client.user.setActivity(`${activities[i++ % activities.length]}`, { type: "PLAYING", url: "https://www.twitch.tv/sebastianjnuwu" }), 8000); 
  client.user
  .setStatus("dnd");
});

// hadler of normal and slash commands
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
module.exports = client;
client.slashCommands = new Discord.Collection();
require("./src/handler")(client);
client.categories = fs.readdirSync(`./src/commands/`);
fs.readdirSync('./src/commands/').forEach(local => {
    const comandos = fs.readdirSync(`./src/commands/${local}`).filter(arquivo => arquivo.endsWith('.js'))
    for(let file of comandos) {
        let puxar= require(`./src/commands/${local}/${file}`)
        if(puxar.name) {
            client.commands.set(puxar.name, puxar)
        } 
        if(puxar.aliases && Array.isArray(puxar.aliases))
        puxar.aliases.forEach(x => client.aliases.set(x, puxar.name))
    } 
});

client.on("messageCreate", async (message) => {
    let prefix = config.prefix;
      if (message.author.bot) return;
      if (message.channel.type == '') return;     
       if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;
      const args = message.content.slice(prefix.length).trim().split(/ +/g);
      let cmd = args.shift().toLowerCase()
      if(cmd.length === 0) return;
      let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd))
      if(!command) return console.log(`Erro 121: o usuario ${message.author.tag} execultou o comando que nao existe: ${prefix}${cmd}`)
      command.run(client, message, args)
});

client.on('guildMemberAdd', member => {
  const DEL = (msg, segundos = 50) => setTimeout(() => msg.delete().catch(() => {}), segundos * 5000);
  const channel = member.guild.channels.cache.find(ch => ch.name === '👋┇bem-vindos');
  if (!channel) return;
  channel.send(`${member} Seja Bem-vindo(a) ao mundo Kettra!`).then(DEL);
});

// Message when the boy is mentioned he responds! (3 language​lol)
client.on("messageCreate", message => {
    if (message.author.bot) return;
    if (message.channel.type == "") return
    if (message.content == `<@${client.user.id}>` || message.content == `<@!${client.user.id}>`) {
     message.reply("Olá me chamou? Estou muita ocupada são muitas almas para cuidar.......");
});

// fim? 
