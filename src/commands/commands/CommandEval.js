const Discord = require('discord.js');
const { inspect } = require('util')

module.exports = {
    name: "eval",
    aliases: ["eva", "eval"],

  run: async (client, message, args) => {

	 let owner = ['932678185970192404']

  if(!owner.includes(message.author.id)) return message.reply(`Apenas meus pais podem usar esse comando.`)

	const code = args.join(" ")
	if(!code) return message.reply(`Você esqueceu do codigo.`)
	
	if(message.author.id === '932678185970192404'){

	if(code.includes("config.token"))return message.reply({content:`Eu não caio nessa.`})
	}

	try{
	  
	  	const result = await eval(code)
			let output = result

	if(typeof output !== 'string') {
						output = inspect(result)
		}
		const embed = new Discord.MessageEmbed()
		.setDescription(`Console:\`\`\`js 
		     ${code}
					\`\`\`
					Resultado:
					\`\`\`js
					${output}
					\`\`\`
					`).setColor(`#b026d6`)

					message.reply({embeds:[embed]});
					
				} catch (error){
				  
	const embed = new Discord.MessageEmbed()
					.setDescription(`Ocorreu um erro:
					\`\`\`js
					${error}
					\`\`\`
					`).setColor(`#b026d6`)

					message.react('❌')
					message.reply({embeds:[embed]})
	}
}
}