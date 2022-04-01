const client = require("../../index");
const config = require("../config/config.json")
const { PREFIX } = require('../config/config.json');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const Discord = require("discord.js")

client.on("messageCreate", async (message) => {

    if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(client.config.prefix))
    return;
    const [cmd, ...args] = message.content.slice(client.config.prefix.length).trim().split(" ");

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) return;
    await command.run(client, message, args);
});

// ===================================================================== //

client.on("messageCreate", async (message) => {

   let prefix = config.prefix 
      if (message.author.bot) return;
      if (message.channel.type == 'dm') return; 
      if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;
      if(!message.content.startsWith(prefix)) return;
      const args = message.content.slice(prefix.length).trim().split(/ +/g);
      let cmd = args.shift().toLowerCase()
      if(cmd.length === 0) return;
      let command = client.commands.get(cmd)
      if(!command) command = client.commands.get() 
});

// ============================================================= //
