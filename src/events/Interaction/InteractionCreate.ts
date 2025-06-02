import CommandContext from "../../structures/CommandContext";
import { Event } from "../../structures/Event";
import {
  ApplicationCommandOptionType,
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  type Interaction,
} from "discord.js";
import client from "../../main";
import { request } from "undici";
import i18next, { type TFunction } from "i18next";
import colors from "colors";

export default new Event(
  "interactionCreate",
  async (interaction: Interaction) => {
    if (interaction instanceof ChatInputCommandInteraction) {
      const command = client.commands.get(interaction.commandName);

      if (!command) return;

      let lang: TFunction | undefined;

      switch (null) {
        case "pt-BR":
          lang = i18next.getFixedT("pt-BR");
          break;
        case "en-US":
          lang = i18next.getFixedT("en-US");
          break;
        default:
          lang = i18next.getFixedT("en-US");
      }

      if (
        command.owner &&
        !client.owner.some((id) => interaction.user.id === id)
      )
        return;

      const args = [];

      const context = new CommandContext(client, interaction, args);

      await command.exec({
        context,
        client,
        interaction,
        lang,
      });
    }
  },
);
