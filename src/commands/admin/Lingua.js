const Discord = require("discord.js")

const { JsonDatabase } = require('kettraworld.db');

const db = new JsonDatabase({

  DatabaseJson:"./src/database/database.json"

});



module.exports = {

    name: "setlanguage",

    aliases: ["setlanguage"],

    run: async(client, message, args) => {





        let language = db.get(`language_${message.guild.id}`);

        if( language == null ) language = "pt";



        if (language === "pt") { 

        if (!message.member.permissions.has("MANAGE_GUILD")) {

            message.reply("Você não tem permissão para usar este comando! Para utilizá-lo, você precisa ter permissão para `Gerenciar mensagens`!")

            }



            if (!args[0] || args[0] !== "pt-BR" && args[0] !== "en" && args[0] !== "es") {

              message.reply("para alterar o idioma deste servidor baste escolher dentre estes:\n🇧🇷 `K.setlanguage pt`\n🇪🇦 `K.setlanguage es`\n🇺🇸 `K.setlanguage en`\n")

            }

        }



        if (!language || language === "en") { 

            if (!message.member.permissions.has("MANAGE_GUILD")) {

              message.reply("You are not allowed to use this command! To use it, you need to have `Manage messages` permission!")

            }



            if (!args[0] || args[0] !== "pt" && args[0] !== "en" && args[0] !== "es") {

              message.reply("to change the language of this server, just choose among these:\n🇧🇷 `K.setlanguage pt` idioma português\n🇪🇦 `K.setlanguage es` lengua española\n🇺🇸 `K.setlanguage en` language inglês")

                

            }

        }

        

        if (!language || language === "es") { 



            if (!message.member.permissions.has("MANAGE_GUILD")) {

                message.reply("¡No tienes permitido usar este comando! ¡Para usarlo, debe tener el permiso 'Gestionar mensajes'!") 

              

            }



            if (!args[0] || args[0] !== "pt" && args[0] !== "en" && args[0] !== "es") {

              message.reply("para cambiar el idioma de este servidor, simplemente elija entre estos:\n🇧🇷 `K.setlanguage pt` idioma português\n🇪🇦 `K.setlanguage es` lengua española\n🇺🇸 `K.setlanguage en")

            

            }

        }



 if (args[0] === "pt") {

    db.set(`language_${message.guild.id}`, "pt");



    message.reply("idioma do servidor foi definido como `portugues!`")



        };

        

 if (args[0] === "es") {

    db.set(`language_${message.guild.id}`, "es");



    message.reply("El idioma del servidor se configuró en `¡Español!`")



        };



 if (args[0] === "en") {

   db.set(`language_${message.guild.id}`, "en");

            

   message.reply("server language was set to `english!`")



        };

        





    }

		}