import { Event } from "../structures/Event";
import client from "../main";
import { Message } from "discord.js";

export default new Event('messageUpdate', async (oldMessage, message) => {
  
  if (!message.guild || !message.author?.bot) return;

  if (message instanceof Message) {
    if (message.content?.trim() !== oldMessage.content?.trim()) {
      client.emit('messageCreate', message);
    }
  }
 
});
