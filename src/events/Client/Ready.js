import { readdirSync } from 'node:fs';
import colors from 'colors';

export default {
    async exec(client) {
        const commands = readdirSync('./src/commands')
            .filter(file => file.endsWith('.js'))
            .map(file => file.slice(0, -3));

        const slash = [];

        for (let name of commands) {
            const file = await import(`#commands/${name}`);

            slash.push(file.create());
        }

        client.application.commands.set(slash);
        client.vulkava.start(client.user.id);

        console.log(
            colors.brightGreen('• ') +
                `${client.user.username} is finally alive...`,
        );
    },
    name: 'ready',
    type: 'once',
};
