export default {
    async exec(client, packet) {
        client.vulkava.handleVoiceUpdate(packet);
    },
    name: 'raw',
    type: 'on',
};
