export default {
  name: 'rank',
  aliases: ['rank'],
  ownerOnly: false,
  async exec({ client, message, t }) {
   
  const player = message.author;
  
  let db = await client.db.user.find({});
   
  db.sort((a,b) => (b.economy.kerein) - (a.economy.kerein));
   
  db = db.slice(0,3);
   
   message.reply(`<:K_coin:939160141675262022> **Os Kelionarios do sub mundo de kettra**\n> ${db.map((player, i) => `#${i+1} | 👥 _${client.users.cache.get(player.id).username}_ - **${abreviar(player.economy.kerein + player.economy.kerein)} KR**`).join("\n> ")}`);
  }
};

function abreviar(number, precision = 2) {
  return number.toLocaleString('en-US', { notation: 'compact', maximumFractionDigits: precision })
 }