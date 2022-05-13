// ♥️ project creator: Sebastian Jn (╯°□°）╯︵ ┻━┻
// 🔍 Original Creator's Github: https://github.com/sebastianjnuwu

// iniciando.........

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

const { fs, colors, dotenv } = require("kettraworld.db"); 
const Discord = require("discord.js");
const client = new Discord.Client({intents: 14071});
const config = require("./config.json");
client.login(process.env.token);
const express = require('express');
const app = express();
const ping = new Date();

app.use((req, res, next) => {
  console.log(`[Info] Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  next()
})

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');

app.listen(process.env.PORT, (req, res) => {
  console.log('[ Info ] - Server is running!');
  
});

app.get('/', (req, res) => {
  res.render('inicio')
})

client.on('ready', () => {
	
console.log(colors.cyan("[Info] ") + `${client.user.tag} foi iniciada em ${client.guilds.cache.size} sevidores!`);

console.log(colors.cyan("[Info] ") + `tendo acesso a ${client.channels.cache.size} canais!`);

console.log(colors.cyan("[Info] ") + `contendo ${client.users.cache.size} usuarios!`);

});

client.on("ready", () => {
  
  let activities = [ `Minecraft em Kettra World 🌟`,],
    i = 0;
  setInterval( () => client.user.setActivity(`${activities[i++ % activities.length]}`, {
     type: "PLAYING", url: "https://www.twitch.tv/sebastianjnuwu"
      }), 5000); 
  client.user
  .setStatus("dnd");
  
});

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
      let canal = client.channels.cache.get(`969290884300537868`)
      if(!command) return canal.send(`Erro 121: o usuario ${message.author.tag} execultou o comando que nao existe: ${prefix}${cmd}`)
      command.run(client, message, args)
      });

client.on('guildMemberAdd', member => {
  
  const deletarMsgComTempo = (msg, segundos = 50) =>
        setTimeout(() => msg.delete().catch(() => {}), segundos * 5000);
        
 const channel = member.guild.channels.cache.find(ch => ch.name === '👋┇bem-vindos');
  if (!channel) return;
  
  channel.send(`${member} Seja Bem-vindo(a) ao mundo Kettra!`).then(deletarMsgComTempo);
 
});

// Message when the boy is mentioned he responds! (3 language​lol)
client.on("messageCreate", message => {
  
const { JsonDatabase } = require('kettraworld.db');

const db = new JsonDatabase({
  DatabaseJson:"./src/database/database.json"
});

    let language = db.get(`language_${message.guild.id}`);
    if( language == null ) { 
      db.set(`language_${message.guild.id}`, "pt");
    }
    
    if (message.author.bot) return;
    if (message.channel.type == "")
    return

    if(message.content == `<@${client.user.id}>` || message.content == `<@!${client.user.id}>`) {
      if (language == "pt") {
         message.reply("Olá me chamou? Estou muita ocupada são muitas almas para cuidar.......");
        }
        
      if (language == "en") {
         message.reply("hello did you call me? I'm too busy, too many souls to take care of.......");
      }
      
      if (language == "es") {
         message.reply("hola me llamaste? Estoy demasiado ocupado, demasiadas almas para cuidar.......");
      }
    }
});

// fim? 
