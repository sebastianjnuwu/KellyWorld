// ♥️ project creator: Sebastian Jn (╯°□°）╯︵ ┻━┻
// ⚙️ where projects are created: https://kettraworld.github.io/discord
// ฅ^•ﻌ•^ฅ my GITHUB: https://github.com/sebastianjnuwu

//All packages used in the project...
const options = { timeZone: 'America/Sao_Paulo', hour: 'numeric',	minute: 'numeric' };
const date = new Intl.DateTimeFormat([], options);
const Discord = require("discord.js");
const client = new Discord.Client({ intents: 32767, ws: { properties: { $browser: "Discord iOS" }} });
const DBL = require('top.gg');
const dbl = new DBL(process.env.topgg, { webhookPort: process.env.PORT || 8080, webhookAuth: 'kelly' })
const config = require("./config.json");
const express = require("express");
const colors = require("colors");
client.login(process.env.token); 
const fs = require("fs");
const app = express();

//Anticlash just after server to keep our application online even if errors occur internally with codes or external connections!
process.on("unhandledRejection", error => {
 console.error(colors.red("[Info]")+" Ocorreu um erro verifique:\n" + error.stack);
});

// check the people who vote for Kelly on the topgg website.
dbl.webhook.on('ready', hook => {
  console.log(`Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`);
});
dbl.webhook.on('vote', vote => {
  console.log(`User with ID ${vote.user} just voted!`);
});

//Hadler of normal and slash commands
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

//Ping system together with uptimerobot
app.use((req, res, next) => {
console.log(colors.yellow("[Info]")+` Ping recebido as ${date.format(new Date())}`);
next();
});

//Site of the bot that will be in the application
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: false }));
app.set("view engine", "ejs");

//Se door that the website will be created!
app.listen(process.env.PORT || 8080, (req, res) => 
  console.log(colors.cyan("[Info]")+` servidor ligado na porta: 8080`)
);

//Start of website
app.get("/", (req, res) => {
  res.render("inicio")
});
    
//will this be the end?
