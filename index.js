// ♥️ project creator: Sebastian Jn
// 🔍 Original Creator's Github: https://github.com/sebastianjnuwu
// 🩸 Support our project: https://mycat.kettraworld.repl.co/
// 🌇 Our main objective in this project: Help cats and make people aware of what they go through and the mistreatment they have suffered!

// iniciando.........

// anticlash just after server to keep our application online even if errors occur internally with codes or external connections!
process.on('unhandledRejection', (reason, p) => {    
       console.log(' [ ANTICLASH ] | SCRIPT REJEITADO');    
       console.log(reason, p);
    });
    
    process.on("uncaughtException", (err, origin) => {
        console.log(' [ ANTICLASH] | CATCH ERROR');
        console.log(err, origin);
    }) 

    process.on('uncaughtExceptionMonitor', (err, origin) => {
        console.log(' [ ANTICLASH ] | BLOQUEADO');
        console.log(err, origin);
    });

    process.on('multipleResolves', (type, promise, reason) => {
        console.log(' [ ANTICLASH ] | VÁRIOS ERROS');
        console.log(type, promise, reason);
    }); 

// Soon after we are requesting the packages and files that our application will need to have its functioning in addition to logging in to discord!
const Discord = require("discord.js");
const client = new Discord.Client({intents: 14071});
const { joinVoiceChannel } = require('@discordjs/voice');
const { fs, colors, dotenv } = require("kettraworld.db");
const API = require("./src/apis/index.js");
const config = require("./config.json");
client.login(process.env.token);

var http = require("http");
http.createServer(function (req, res) {
res.writeHead(200);
res.end("{'token':'S2V0dHJhd29ybGQ='}");	
const ping = new Date();
ping.setHours(ping.getHours() - 3);	
console.log(`[Info] Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
}).listen(process.env.PORT); 

client.on('ready', () => {
	
console.log(colors.cyan("[Info] ") + `${client.user.tag} foi iniciada em ${client.guilds.cache.size} sevidores!`)
console.log(colors.cyan("[Info] ") + `tendo acesso a ${client.channels.cache.size} canais!`)
console.log(colors.cyan("[Info] ") + `contendo ${client.users.cache.size} usuarios!`)

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
      let canal = client.channels.cache.get(`962361906373468230`)
      if(!command) return canal.send(`Erro 121: o usuario ${message.author.tag} execultou o comando que nao existe: ${prefix}${cmd}`)
      command.run(client, message, args)
      });
      
client.on('ready', () => {
  
  let activities = [ `New challenges: 🌟 Support against animal violence`,`New project: 😺 cat support`, ],
            i = 0; 
        setInterval(
            () =>
                client.user.setActivity(`${activities[i++ % activities.length]}`, {
                    type: "STREAMING",
                    url: "https://www.twitch.tv/sebastianjnuwu" 
                }),
             1000 * 60
        );
    })

client.on('guildMemberAdd', member => {

 const channel = member.guild.channels.cache.find(ch => ch.name === '🎑┇bem-vindos');
 
  if (!channel) return;
  
  let embed = new Discord.MessageEmbed()

      .setThumbnail(member.user.displayAvatarURL())
      .setImage("https://raw.githubusercontent.com/sebastianjn/sebastianjn/main/imagens/bemvindo.jpeg")
      .setColor('RANDOM')
      .setTitle (`Bem vindos a KettraWorld!`)
      .setDescription(`**Anjo:**  Olá Humano **${member.user.tag}!** Sou seu anjo da guarda em KettraWorld, com você **${member.guild.memberCount}** almas foram ajudadas por mim!\n\nAgora vamos ao que importa, o mundo que você renascera se chama Kettra, um magnífico mundo RPG onde você ira criar a sua história e junto de seus companheiros de aventura irão desbravar esse imenso lugar e descobrir todos os seus segredos.\n\nPor enquanto nos despedimos aqui, quando você entrar em Kettra estarei lá para te acompanhar e ajudar em sua nova jornada.\n\nUse **K.kettra ip** para descobrir o caminho de como entrar em KettraWorld`)
      
 channel.send({ content: `${member}`, embeds: [embed] });
 
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
         message.reply("Olá meu nome é `MyCat` Você me chamou?");
        }
        
      if (language == "en") {
         message.reply("Hello my name is `MyCat` Did you call me?");
      }
      
      if (language == "es") {
         message.reply("Hola mi nombre es `MyCat` ¿Me llamaste?");
      }
    }
});


// 👋 Hello moto! My name is Sebastian I live in the northeast of Brazil, this is another creation of mine to help the kittens who suffer every day ಠ_ಠ 

// 📸 Social media: @sebastianjnuwu

// 🥺 Want to buy me a coffee? Lol I've been awake for days and the coffee is over! ;-;

// ☕ Buy coffee:  https://ko-fi.com/sebastianjnuwu

// 🌟 Will it be the end of KellyWorld? Will this be the end of this wonderful project? In order to help and educate people about how to take care of their cats who suffer every day from mistreatment! /ᐠ｡ꞈ｡ᐟ\

// 👻 Did you like my work? Contact me: sebastianjnuwu@gmail.com