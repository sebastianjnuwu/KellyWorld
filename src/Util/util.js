import { WebhookClient } from 'discord.js';
  
export default {
  async sendLogs({ content, type }) {
    switch(type) {
     case 'command':
       new WebhookClient({
        url: global.config.logs.command
      }).send({ content });
       break;
       case 'guild':
       new WebhookClient({
        url: global.config.logs.guild
      }).send({ content });
       break;
    }
  },
};