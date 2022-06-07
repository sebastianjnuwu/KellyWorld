//Importing the packages used in this command!
const Discord = require('discord.js');
const { inspect } = require('util')

//Import module accepted by hadler!
module.exports = {
    name: "eval",
    aliases: ["eva", "eval"],
  run: async (client, message, args) => {

//the discord id of who can use the command
	 let owner = ['932678185970192404']

//an If to allow only the authorized user to use the command!
  if(!owner.includes(message.author.id)) return message.reply(`Apenas meus pais podem usar esse comando.`)

//variable responsible for getting the code typed
	const code = args.join(" ")
	
//an If that says if you didn't put a code after the command!
	if(!code) return message.reply(`Você esqueceu do codigo.`)
	
	//the discord id of who can use the command
	if(message.author.id === '932678185970192404'){

	try{
	    //process the code
	  	const result = await eval(code)
			let output = result

	if(typeof output !== 'string') {
						output = inspect(result)
		}
		
		// we define the message in embed of the result!
		const embed = new Discord.MessageEmbed()
		.setDescription(`Console:\`\`\`js 
		     ${code}
					\`\`\`	
Resultado:
					\`\`\`js
					${output}
					\`\`\``).setColor(`#b026d6`)

					message.reply({embeds:[embed]});
				
		//we use cath so if there is an error don't shut down the bot!
				} catch (error){
	
	// we set the embed error message!  
	const embed = new Discord.MessageEmbed()
					.setDescription(`Ocorreu um erro:
					\`\`\`js
					${error}
					\`\`\`
					`).setColor(`#b026d6`)
         //error message if the code is not correct!
					message.react('❌')
					message.reply({embeds:[embed]})
	
}
//will be the end of the code? I think so!
}
  }
}