const { Discord, Client } = require("discord.js");
const client = new Client({intents: 512});
const { mysql } = require('kettraworld.db');

 const connection = mysql.createConnection({
  host            : `${process.env.host}`,
  user            : `${process.env.user}`,
  password        : `${process.env.senha}`,
  database        : `${process.env.database}`
});


setInterval(function() {
connection.query('SELECT * FROM transacao WHERE status_transacao = 2', function (error, results, fields) {
  if (error) throw error;
  
  const uuid = results[0]?.uuid;
 
  const nick = results[0]?.nick;
 
  const id_pacote = results[0]?.id_pacote;
  
  const data_transacao = results[0]?.data_transacao;
    
  if (id_pacote === 1 ) {
      
     client.login(process.env.token).then(() => {
     client.channels.fetch("916730351248867359").then((canal) => {
     canal.send({ content: `ouro adicionar \`${nick}\` 1800` });
     });
 });
     
     client.login(process.env.token).then(() => {
     client.channels.fetch("901106951704952862").then((canal) => {
     canal.send({ content: `> <:K_stonks:939162797835710495> **Nova compra realizada!**\n> 🤔 Quem comprou: **${nick}**\n> 🗓️ data: **${data_transacao}**\n> 📦 id do pacote: **${id_pacote}**` });
     });
 });
     
     connection.query('DELETE FROM transacao WHERE transacao.uuid = ?', [`${uuid}`] , function(err, rows, fields) {
   
});

}


if (id_pacote === 2 ) {
      
     
     client.login(process.env.token).then(() => {
     client.channels.fetch("916730351248867359").then((canal) => {
     canal.send({ content: `ouro adicionar \`${nick}\` 3500` });
    });
});
     
     client.login(process.env.token).then(() => {
     client.channels.fetch("901106951704952862").then((canal) => {
     canal.send({ content: `> <:K_stonks:939162797835710495> **Nova compra realizada!**\n> 🤔 Quem comprou: **${nick}**\n> 🗓️ data: **${data_transacao}**\n> 📦 id do pacote: **${id_pacote}**` });
     });
  });
    
    connection.query('DELETE FROM transacao WHERE transacao.uuid = ?', [`${uuid}`] , function(err, rows, fields) {
   
});

}


if (id_pacote === 3 ) {

     client.login(process.env.token).then(() => {
     client.channels.fetch("916730351248867359").then((canal) => {
     canal.send({ content: `ouro adicionar \`${nick}\` 4700` });
     });
 });
     
     client.login(process.env.token).then(() => {
     client.channels.fetch("901106951704952862").then((canal) => {
     canal.send({ content: `> <:K_stonks:939162797835710495> **Nova compra realizada!**\n> 🤔 Quem comprou: **${nick}**\n> 🗓️ data: **${data_transacao}**\n> 📦 id do pacote: **${id_pacote}**` });
     });
 });

connection.query('DELETE FROM transacao WHERE transacao.uuid = ?', [`${uuid}`] , function(err, rows, fields) {
   
});

}

if (id_pacote === 4 ) {
      
     client.login(process.env.token).then(() => {
     client.channels.fetch("916730351248867359").then((canal) => {
     canal.send({ content: `ouro adicionar \`${nick}\` 7500` });
     });
 });
     
     client.login(process.env.token).then(() => {
     client.channels.fetch("901106951704952862").then((canal) => {
     canal.send({ content: `> <:K_stonks:939162797835710495> **Nova compra realizada!**\n> 🤔 Quem comprou: **${nick}**\n> 🗓️ data: **${data_transacao}**\n> 📦 id do pacote: **${id_pacote}**` });
    });
  });
    
    connection.query('DELETE FROM transacao WHERE transacao.uuid = ?', [`${uuid}`] , function(err, rows, fields) {
   
});

}

if (id_pacote === 5 ) {
      
    
     client.login(process.env.token).then(() => {
     client.channels.fetch("916730351248867359").then((canal) => {
     canal.send({ content: `ouro adicionar \`${nick}\` 10900` });
     });
 });
     
     client.login(process.env.token).then(() => {
     client.channels.fetch("901106951704952862").then((canal) => {
     canal.send({ content: `> <:K_stonks:939162797835710495> **Nova compra realizada!**\n> 🤔 Quem comprou: **${nick}**\n> 🗓️ data: **${data_transacao}**\n> 📦 id do pacote: **${id_pacote}**` });
     });
  });
    
    connection.query('DELETE FROM transacao WHERE transacao.uuid = ?', [`${uuid}`] , function(err, rows, fields) {
   
});

}

if (id_pacote === 6 ) {
      
     client.login(process.env.token).then(() => {
     client.channels.fetch("916730351248867359").then((canal) => {
     canal.send({ content: `ouro adicionar \`${nick}\` 26300` });
     });
  });
     
     client.login(process.env.token).then(() => {
     client.channels.fetch("901106951704952862").then((canal) => {
     canal.send({ content: `> <:K_stonks:939162797835710495> **Nova compra realizada!**\n> 🤔 Quem comprou: **${nick}**\n> 🗓️ data: **${data_transacao}**\n> 📦 id do pacote: **${id_pacote}**` });
     });
  });
    
    connection.query('DELETE FROM transacao WHERE transacao.uuid = ?', [`${uuid}`] , function(err, rows, fields) {
   
});

}
 // parou aqui!
}); 
}, 60000);