//Importing the packages used in this command!
const Discord = require("discord.js");
const got = require('got');

//Import module accepted by hadler!
module.exports = {
  name: "meme",
  aliases: ["meme"],
	run: async(message) => {
  
  //what makes meme command work has bug ;-;
    const meme = new Discord.MessageEmbed()
	  got('https://www.reddit.com/r/MemesBR/random/.json').then(response => {
	 	const [list] = JSON.parse(response.body);
		const [post] = list.data.children;
		const memeImage = post.data.url;
  	meme.setColor('RANDOM')
    meme.setImage(memeImage)
		message.reply({ embeds: [meme] })
    }).catch(console.error);
    
	}
	//end of code? I think so!
};