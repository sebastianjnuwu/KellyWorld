const Discord = require("discord.js");
const client = require("./../../index.js");
const { colors } = require("kettraworld.db");
const config = require("./../../config.json");

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
