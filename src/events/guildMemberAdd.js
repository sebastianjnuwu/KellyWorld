const Discord = require("discord.js");
const client = require('./../../index.js');

client.on("guildMemberAdd", (member) => {
  const DEL = (msg, segundos = 50) => setTimeout(() => msg.delete().catch(() => {}), segundos * 5000);
  const channel = member.guild.channels.cache.find(
  (ch) => ch.name === '👋┇bem-vindos');
  if (!channel) return;
  channel.send(`${member} Seja Bem-vindo(a) ao mundo Kettra!`).then(DEL);
});