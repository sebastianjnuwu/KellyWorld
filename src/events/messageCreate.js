const Discord = require("discord.js");
const client = require('./../../index.js');

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (message.channel.type == "") return
  if (message.content == `<@${client.user.id}>` || message.content == `<@!${client.user.id}>`) {
  const mgs = [ 
  `<:K_env:938833579981566043>`,
  `<:K_zan:924366252024164363>`
  ]; 
  let mes = () => mgs[~~(Math.random() * mgs.length)];
  message.reply(`${mes()}`);
	}
});
