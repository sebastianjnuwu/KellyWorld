import { inspect } from 'util';

export default {
  name: 'eval',
  aliases: ['e', 'eval'],
  ownerOnly: true,
  async exec({ message, client, args, t }) {
    
  const code = args.join(" ");
  
  if(!code) return message.reply("enfim.... cadê o código?");
  
  	try{
	   
	 const result = await eval(code)
   let output = result

	if(typeof output !== 'string') {
						output = inspect(result);
		}
	
		message.reply(`**Console:**\`\`\`js 
${code} 
\`\`\`	
**Resultado:**
\`\`\`js
${output}
\`\`\``);
			
				} catch (error){

	message.reply(`**Ocorreu um erro:**
\`\`\`js 
${error} \`\`\`
`);
					message.react('❌');
	
  	}
  },
};