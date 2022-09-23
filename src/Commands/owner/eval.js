import { inspect } from 'util';

export default {
  name: 'eval',
  aliases: ['e', 'eval'],
  ownerOnly: true,
//  eslint-disable-next-line no-unused-vars
  async exec({ message, client, t, args }) {
    
  const code = args.join(' ');
  
  if (!code) return message.reply(`${t('TEXT:eval.message')}`);
  
 try {
    
  const result = await eval(code);
  let output = result;

  if (typeof output !== 'string') {
     output = inspect(result);
 }
	
   message.reply(`**Console:**\`\`\`js\n${code}\n\`\`\`\n**Result:**\n\`\`\`\n${output}\n\`\`\``);

  } catch (error){

  message.reply(`**Error:**\n\`\`\`\n${error}\n\`\`\``);
 
  message.react('❌');
	
    }
  },
};