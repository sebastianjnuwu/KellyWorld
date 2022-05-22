// ♥️ project creator: Sebastian Jn (╯°□°）╯︵ ┻━┻
// ⚙️ where projects are created: https://kettraworld.github.io/discord
// ฅ^•ﻌ•^ฅ my GITHUB: https://github.com/sebastianjnuwu

// all packages used in the project
const { fs, colors } = require("kettraworld.db"); 
const Discord = require("discord.js");
const client = new Discord.Client({ intents: 32767 });
const config = require("./config.json");
const express = require("express");
const ping = new Date();
const app = express();
client.login(process.env.token); 

// useful information
client.on("ready", () => {
 console.log(colors.cyan("[Info]")+` ${client.user.tag} foi iniciada em ${client.guilds.cache.size} sevidores!`);
 console.log(colors.cyan("[Info]")+` tendo acesso a ${client.channels.cache.size} canais!`);
 console.log(colors.cyan("[Info]")+` contendo ${client.users.cache.size} usuarios!`);
});

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
  let activities = ["Minecraft em Kettra World 🌟"];
  i = 0;
  setInterval( () => client.user.setActivity(`${activities[i++ % activities.length]}`, { type: "STREAMING", url: "https://www.twitch.tv/sebastianjnuwu" }), 8000); 
  client.user
  .setStatus("dnd");
});

// hadler of normal and slash commands
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
module.exports = client;
client.slashCommands = new Discord.Collection();
require("./src/handler")(client);
client.categories = fs.readdirSync("./src/commands/");
fs.readdirSync('./src/commands/').forEach(local => {
const comandos = fs.readdirSync(`./src/commands/${local}`).filter(arquivo => arquivo.endsWith('.js'))
for(let file of comandos) {
let puxar = require(`./src/commands/${local}/${file}`)
if(puxar.name) {
client.commands.set(puxar.name, puxar)
}
if(puxar.aliases && Array.isArray(puxar.aliases))
puxar.aliases.forEach(x => client.aliases.set(x, puxar.name))
} 
});

//Event
client.on("messageCreate", async (message) => {
  let prefix = config.prefix;
  if (message.author.bot) return;
  if (message.channel.type == '') return;     
  if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  let cmd = args.shift().toLowerCase()
  if(cmd.length === 0) return;
  let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd))
  if(!command) return console.log(colors.red(`Erro 121: o usuario ${message.author.tag} execultou o comando que nao existe: ${prefix}${cmd}`));
  command.run(client, message, args)
});

//Kettraworld server welcome screen
client.on("guildMemberAdd", member => {
  const DEL = (msg, segundos = 50) => setTimeout(() => msg.delete().catch(() => {}), segundos * 5000);
  const channel = member.guild.channels.cache.find(
  (ch) => ch.name === '👋┇bem-vindos');
  if (!channel) return;
  channel.send(`${member} Seja Bem-vindo(a) ao mundo Kettra!`).then(DEL);
});

//Message when the boy is mentioned he responds! (3 language​lol)
client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (message.channel.type == "") return
  if (message.content == `<@${client.user.id}>` || message.content == `<@!${client.user.id}>`) {
  const mgs = [ 
  `<:K_env:938833579981566043>`,
  `<:K_zan:924366252024164363>`,
  `<:K_rei:939165290846093392>`
  ]; 
  let mes = () => mgs[~~(Math.random() * mgs.length)];
  message.reply(`${mes()}`);
	}
});

//Ping system together with uptimerobot
app.use((req, res, next) => {
console.log(colors.yellow("[Info]")+` Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
next();
});

//Site of the bot that will be in the application
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: false }));
app.set("view engine", "ejs");

//Se door that the website will be created!
app.listen(8080, (req, res) => 
  console.log(colors.cyan("[Info]")+` servidor ligado na porta: 8080`)
);

//Start of website
app.get("/", (req, res) => {
  res.render("inicio")
});
    
//@sebastianjnuwu