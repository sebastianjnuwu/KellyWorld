//iniciando.......
var http = require('http');

http.createServer(function (req, res) {

 res.writeHead(200);
  res.end("estou online! U^ｪ^U");
	
const ping = new Date();
	
  ping.setHours(ping.getHours() - 3);
	
       console.log(`[Info] Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  
}).listen(process.env.PORT);

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

const Discord = require("discord.js");

const API = require("./src/apis/API.js");

const client = new Discord.Client({intents: 14071});

const config = require("./config.json");

const env = require("dotenv").config()

const fs = require("fs");

const colors = require('colors');

client.login(process.env.token);

const { joinVoiceChannel } = require('@discordjs/voice');

client.on('ready', () => {
	
console.log(colors.cyan("[Info] ") + `${client.user.tag} foi iniciada em ${client.guilds.cache.size} sevidores!`)
	
console.log(colors.cyan("[Info] ") + `tendo acesso a ${client.channels.cache.size} canais!`)
	
console.log(colors.cyan("[Info] ") + `contendo ${client.users.cache.size} usuarios!`)
})

client.on("messageCreate", async (message) => {
    let prefix = config.prefix;
      if (message.author.bot) return;
      if (message.channel.type == 'dm') return;     
       if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;
      const args = message.content.slice(prefix.length).trim().split(/ +/g);
      let cmd = args.shift().toLowerCase()
      if(cmd.length === 0) return;
      let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd))
      let canal = client.channels.cache.get(`933358218552442951`)
      if(!command) return canal.send(`Erro 121: o usuario ${message.author.tag} execultou o comando que nao existe: ${prefix}${cmd}`)
      command.run(client, message, args)
      });
      
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
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

// carregandos os eventos

fs.readdir("./src/events/", (err, files) => {
  if (err) return console.error(err);

  files.forEach(file => {
    const event = require(`./src/events/${file}`);
    let eventName = file.split(".")[0];
    console.log(colors.cyan("[Info] ") + `carregando: ${eventName}`);
    client.on(eventName, event.bind(null, client));
  });
}); 

client.on('ready', () => {
	
  let activities = [
      `DELIVERY: Meu prefixo é `, 
      `DELIVERY: Me chame para seu servidor!`, 
        ],
            i = 0; 
        setInterval(
            () =>
                client.user.setActivity(`${activities[i++ % activities.length]}`, {
                    type: "STREAMING",
                    url: "https://www.twitch.tv/sebastianjn007" 
                }),
             1000 * 60
        );
    })

client.on('guildMemberAdd', member => {

 const channel = member.guild.channels.cache.find(ch => ch.name === '🎑┇bem-vindos');
 
  if (!channel) return;
  
  let embed = new Discord.MessageEmbed()

      .setThumbnail(member.user.displayAvatarURL())
      .setImage("https://raw.githubusercontent.com/sebastianjn/host/main/imagens/bemvindo.jpeg")
      .setColor('RANDOM')
      .setTitle (`Bem vindos a KettraWorld!`)
      .setDescription(`**Anjo:**  Olá Humano **${member.user.tag}!** Sou seu anjo da guarda em KettraWorld, com você **${member.guild.memberCount}** almas foram ajudadas por mim!\n\nAgora vamos ao que importa, o mundo que você renascera se chama Kettra, um magnífico mundo RPG onde você ira criar a sua história e junto de seus companheiros de aventura irão desbravar esse imenso lugar e descobrir todos os seus segredos.\n\nPor enquanto nos despedimos aqui, quando você entrar em Kettra estarei lá para te acompanhar e ajudar em sua nova jornada.\n\nUse **kettra ip** para descobrir o caminho de como entrar em KettraWorld`)
      
 channel.send({ content: `${member}`, embeds: [embed] });
 
});

//fim :)
