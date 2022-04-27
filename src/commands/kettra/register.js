const Discord = require("discord.js");
const nodemailer = require('nodemailer');
const { mysql , JsonDatabase } = require('kettraworld.db');
const db = new JsonDatabase({ DatabaseJson:"./src/database/database.json" });
const connection = mysql.createConnection({
  host            : `${process.env.host}`,
  user            : `${process.env.user}`,
  password        : `${process.env.senha}`,
  database        : `${process.env.database}`
});

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
  	user: "kettraworld@gmail.com",
  	pass: `${process.env.a}`
  },
  tls: { rejectUnauthorized: false }
});

    
module.exports = {
    name: "register",
    aliases: ["register"],

  run: async(client, message, args) => {
message.delete();

const site = db.fetch(`site_${message.author.id}`);
   
const deletarMsgComTempo = (msg, segundos = 10) =>
        setTimeout(() => msg.delete().catch(() => {}), segundos * 1000);

let verified = db.get(`site_${message.author.id}`);


 if( message.guild.id !== "893997835412971570") {
	  return
	  
 } else {
 
 if (verified) {
     return message.channel.send(`voce já estar registrado!`).then(deletarMsgComTempo);
     
 } else if (!message.member.roles.cache.has("937362152308744212")) {
           message.channel.send("vocé precisa vincular sua conta do mine no discord!").then(deletarMsgComTempo);
     
 } else if (!args[0]) {
    return message.channel.send(`${message.author} utilize K.register seuemail@gmail.com senha123`).then(deletarMsgComTempo);
  
 } else if (!args[1]) {
    return message.channel.send(`${message.author} utilize K.register seuemail@gmail.com senha123`).then(deletarMsgComTempo);
 }
 
  let email = args[0];
  let site = 'https://site.kettraworld.repl.co/auth?token='
  let usuario = message.member.nickname || message.author.username;
  let senha = args[1];
  let token = Math.random().toString(16).substr(2);
  let link = `${message.author.displayAvatarURL({
        dynamic: "gif",
        format: "png"
      })}`;
  
  connection.query("INSERT INTO usuario ( id, usuario, senha, discord, cargo, email, token, link, status) VALUES ( NULL, ?, ?, ?, ?, ?, ?, ?, ?);",[`${usuario}`, `${senha}`, `${message.author.id}`, `${message.member.roles.highest.name}`,`${email}`, `${token}`, `${link}`, `0`],  function (error, results, fields) {
      
  if (error) throw error;
 
 
 message.channel.send(`${message.author}, acabamos de lé enviar um email verifique sua conta e acesser nosso site!`).then(deletarMsgComTempo);
 db.add(`site_${message.author.id}`, 1);
 
 const mailOptions = {
  from: 'kettraworld@gmail.com',
  to: `${args[0]}`,
  subject: 'Seja Bem-Vindo a Kettra world',
  text: `\nOla ${usuario} para poder acessar nosso site por favor confirme se realmente vocé é quem diz ser!\n\nConfirma email: ${site}${token}\n\n"Kettra World preza pela sua privacida e segurança"`
};
        
  transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email enviado: ' + info.response);
  }
});

});
      }
   }
}
