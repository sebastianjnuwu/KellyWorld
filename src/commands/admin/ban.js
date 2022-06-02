const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'ban',
  run: async (client, message, args) => {

    if(!message.guild.me.permissions.has("ADMINISTRATOR")) {    
       return message.reply("<:K_zan:924366252024164363>  eu tou sem ah permissão de `ADMINISTRADOR` infelizmente sou inútil ಥ╭╮ಥ") 
}
    if(!message.member.permissions.has('BAN_MEMBERS')) 
       return message.reply(`${message.author} **Você não possui a permissão para banir membros.**`).then(mDel => {
           setTimeout(() => {
              mDel.delete().catch(o_U => {})
           message.delete().catch(o_U => {})
        }, 10000)
    })

    if(!message.guild.me.permissions.has('BAN_MEMBERS'))
       return message.reply(`${message.author} **Eu não tenho permissão para banir membros.**`).then(mDel => {
           setTimeout(() => {
              mDel.delete().catch(o_U => {})
            message.delete().catch(o_U => {})
         }, 10000)
      })

    if(!args[0]) 
    return message.reply(`${message.author} **Você não informou o membro a ser banido.**`).then(mDel => {
      setTimeout(() => {
          mDel.delete().catch(o_U => {})
        message.delete().catch(o_U => {})
    }, 10000)
  })

    if(isNaN(args[0]) && !args[0].startsWith('<@') && !args[0].endsWith('>')) return message.reply(`${message.author} **Isto não é uma menção ou um id válido.**`).then(mDel => {
      setTimeout(() => {
        mDel.delete().catch(o_U => {})
        message.delete().catch(o_U => {})
      }, 10000)
    })

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

    if(!member) return message.reply(`Este membro não existe neste servidor.`).then(mDel => {
      setTimeout(() => {
        mDel.delete().catch(o_U => {})
        message.delete().catch(o_U => {})
      }, 10000)
    })
    if(member.id === message.author.id) return message.reply(`${message.author} **Você não pode banir a si mesmo.**`).then(mDel => {
      setTimeout(() => {
        mDel.delete().catch(o_U => {})
        message.delete().catch(o_U => {})
      }, 10000)
    })
    if(member.id === client.user.id) return message.reply(`${message.author} **Você não pode me banir!**`).then(mDel => {
      setTimeout(() => {
        mDel.delete().catch(o_U => {})
        message.delete().catch(o_U => {})
      }, 10000)
    })
    if(!member.bannable) return message.reply(`${message.author} **Eu não consigo banir este membro.**`).then(mDel => {
      setTimeout(() => {
        mDel.delete().catch(o_U => {})
        message.delete().catch(o_U => {})
      }, 10000)
    })

    let reason = !args.slice(1).join(' ') ? 'Não Informado' : args.slice(1).join(' ')
    
    message.reply(`${message.author}\n**Você realmente desaja banir o membro** ${member}?\n*Caso deseja cancelar o banimento clique na reação ❌.*\n*Caso queira banir o membro clique na reação ✅.*`).then(async (msg) => {
      msg.react('✅')
      msg.react('❌')

      const filter = (reaction, user) => user.id === message.author.id

      const collector = msg.createReactionCollector({ filter, max: 1, time: 60000 });

      collector.on('end', reaction => {
        let emoji = reaction.map(x => x.emoji.name).toString()

        if(emoji === '✅') {
      
          member.send(`infelizmente vocé foi banido do servidor **${message.guild.name}, o motivo: **${reason}`).catch(o_U => {})
          
      msg.edit(`${message.author}\n**O membro \`${member.user.tag}\` foi banido do servidor com sucesso.**\n*Motivo: **${reason}***`).then(mDel => {
            setTimeout(() => {
              mDel.delete().catch(o_U => {})
              message.delete().catch(o_U => {})
            }, 10000)
          })
          member.ban({ reason: reason })
        } else if(emoji === '❌') {
          msg.edit(`${message.author}\n**O banimento de ${member} foi cancelado com sucesso.**`).then(mDel => {
            setTimeout(() => {
              mDel.delete().catch(o_U => {})
              message.delete().catch(o_U => {})
            }, 10000)
          })
        }
      })

      setTimeout(() => {
        msg.delete().catch(o_U => {})
        message.delete().catch(o_U => {})
      }, 60000)

    })

  }
}