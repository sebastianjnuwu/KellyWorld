import { WebhookClient } from 'discord.js';
  
export default {
  async sendLogs({ content, type }) {
    switch(type) {
     case 'log':
       new WebhookClient({
        url: global.config.logs.logs
      }).send({ content });
       break;
    }
  },
};