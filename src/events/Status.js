const Discord = require("discord.js");
const client = require('./../../index.js');

//Activity status of our bot
client.on("ready", () => {
 let activities = ["Minecraft em Kettra World 🌟 | Cluster UwU"];
 let i = 0;
 setInterval(() => 
 client.user.setActivity(`${activities[i++ % activities.length]}`, { type: "PLAYING", url: "https://www.twitch.tv/sebastianjnuwu" }), 8000); 
});