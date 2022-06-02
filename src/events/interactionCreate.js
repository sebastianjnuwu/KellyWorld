//Importing the files and packages that will be used!
const {Collection, Intents } = require('discord.js');
const client = require('./../../index.js')

//creating an interaction events!
client.on("interactionCreate", async (interaction) => {
    if (!interaction.guild) return;
    if (interaction.isCommand()) {
        const cmd = client.slashCommands.get(interaction.commandName);
    if (!cmd)
         return;
    const args = [];
       for (let option of interaction.options.data) {
    if (option.type === "SUB_COMMAND") {
    if (option.name) args.push(option.name);
        option.options?.forEach((x) => {
    if (x.value) args.push(x.value);
});
    } else if (option.value) args.push(option.value);
}
     cmd.run(client, interaction, args);
}
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
    if (command) command.run(client, interaction);      
    }
    //End of file I don't know how to use slash ;-;
});