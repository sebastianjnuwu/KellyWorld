import { WebhookClient } from 'discord.js';
  
export default {
  async sendLogs({ content, type }) {
    switch(type) {
     case 'command':
       new WebhookClient({
        url: process.env.command
      }).send({ content });
       break;
       case 'guild':
       new WebhookClient({
        url: process.env.guild
      }).send({ content });
       break;
    }
  },
};