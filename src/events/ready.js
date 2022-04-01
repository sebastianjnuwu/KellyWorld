const black = "\x1b[30m",
red = "\x1b[31m",
green = "\x1b[32m",
yellow = "\x1b[33m",
blue = "\x1b[34m",
purple = "\x1b[35m",
cyan = "\x1b[36m",
white = "\x1b[37m"

colorful = (color, string, reset = '\x1b[0m') => color + string + reset;
const client = require("../../index");

client.once("ready", () => {
  client.user.setActivity("Estou Online", {
  });
  console.log(colorful(purple, `[LOGS] ${client.user.tag} Está online!\n[LOGS] Estou em ${client.guilds.cache.size} servidores.\n[LOGS] Cuidando de ${client.users.cache.size} membros.`))

});

const cfonts = require('cfonts');
const banner = cfonts.render((`ONLINE`), {
        font: 'block',
        color: 'candy',
        align: 'left',
        gradient: ["red","magenta"],
        lineHeight: 3
    });
console.log(banner.string);

// ===================================================================== //