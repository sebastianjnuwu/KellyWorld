const Discord = require("discord.js");
const axios = require("axios").default;
const { JsonDatabase } = require('kettraworld.db');
const db = new JsonDatabase({
  DatabaseJson:"./src/database/database.json"
});

module.exports = {
    name: "meme",
    aliases: ["meme"],

	run: async(client, message, args) => {
    
        let language = db.get(`language_${message.guild.id}`);
    if( language == null ) { 
      db.set(`language_${messag.guild.id}`, "pt");
    }
    
    if (language === "pt") {
        
        const options = {
            method: "GET",
            url: "https://reddit.com/r/dankmemes/random/.json",
        };

        axios.request(options).then(response => {
            let meme = response.data[0].data.children[0].data;
            let memeEmbed = new MessageEmbed()
                .setTitle(meme.title)
                .setURL(`https://reddit.com${meme.permalink}`)
                .setImage(meme.url)
                .setColor("RANDOM")
                .setFooter(`👍 ${meme.ups} | 💬 ${meme.num_comments}`);

            message.reply({ embeds: [memeEmbed] });
        }).catch(err => {
            console.log(err);
            return message.reply({ content: ":x:" });
        });
    }
}
}