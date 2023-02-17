
export default {
  name: 'raw',
  type: 'on',
  async exec(client, packet) {
    
  client.vulkava.handleVoiceUpdate(packet);
   
  }
}