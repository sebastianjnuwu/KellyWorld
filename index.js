//início de uma nova aventuru!
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

const client = new Discord.Client({intents: 14071});

const config = require("./config.json");

const env = require("dotenv").config()

const fs = require("fs");

const idioma = require("./src/lingua.js");

const colors = require('colors');

client.login(process.env.token);

const { joinVoiceChannel } = require('@discordjs/voice');

client.on('ready'), () => {
	
	const { JsonDatabase } = require("wio.db");
	const db = new JsonDatabase({
  databasePath:"./src/database/idioma.json"
});
	const idioma = db.fetch(`idioma_${guild.id}`)
	if(idioma == null) {
        return db.set(`idioma_${guild.id}`, pt)
	}
}

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
      `DELIVERY: Meu prefixo é K.`, 
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


client.on("messageCreate", message,idioma => {

    if (message.author.bot) return;

    if (message.channel.type == '')

    return;

    if(message.content == `<@${client.user.id}>` || message.content == `<@!${client.user.id}>`) {

    let bot = new Discord.MessageEmbed()

    .setTitle(`Minhas informações`)

    .setColor("RANDOM")

    .setDescription(`${idioma.mention.ola}`);

    message.channel.send({ embeds: [bot] })

    }

});