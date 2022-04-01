const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
const globPromise = promisify(glob);
const chalk = require("chalk");

module.exports = async (client) => {

const slashCommands = await globPromise(
        `${process.cwd()}/src/SlashCommands/*/*.js`
    );

    const arrayOfSlashCommands = [];
    slashCommands.map((value) => {
        const file = require(value);
        if (!file?.name) return;
        client.slashCommands.set(file.name, file);

        if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
        arrayOfSlashCommands.push(file);
    });
    client.on("ready", async () => {
        await client.application.commands.set(arrayOfSlashCommands);

    });
  
// ============================================================= //

    const commandFiles = await globPromise(`${process.cwd()}/src/commands/**/*.js`);
    commandFiles.map((value) => {
        const file = require(value);
        const splitted = value.split("/");
        const directory = splitted[splitted.length - 2];

        if (file.name) {
            const properties = { directory, ...file };
            client.commands.set(file.name, properties);
        }
    });

  // ============================================================ //
  
    const eventFiles = await globPromise(`${process.cwd()}/src/events/*.js`);
    eventFiles.map((value) => require(value)
    );

    process.on("unhandledRejection", (reason, p) => {
        console.log(chalk.gray("—————————————————————————————————"));
        console.log(
           chalk.white("["),
           chalk.red.bold("AntiCrash"),
           chalk.white("]"),
           chalk.gray(" : "),
           chalk.white.bold("Unhandled Rejection/Catch")
        );
        console.log(chalk.gray("—————————————————————————————————"));
        console.log(reason, p);
     });
    process.on("uncaughtException", (err, origin) => {
        console.log(chalk.gray("—————————————————————————————————"));
        console.log(
           chalk.white("["),
           chalk.red.bold("AntiCrash"),
           chalk.white("]"),
           chalk.gray(" : "),
           chalk.white.bold("Uncaught Exception/Catch")
        );
        console.log(chalk.gray("—————————————————————————————————"));
        console.log(err, origin);
     });
    process.on("multipleResolves", (type, promise, reason) => {
        console.log(chalk.gray("—————————————————————————————————"));
        console.log(
           chalk.white("["),
           chalk.red.bold("AntiCrash"),
           chalk.white("]"),
           chalk.gray(" : "),
           chalk.white.bold("Multiple Resolves")
        );
        console.log(chalk.gray("—————————————————————————————————"));
        console.log(type, promise, reason);
     });
};
