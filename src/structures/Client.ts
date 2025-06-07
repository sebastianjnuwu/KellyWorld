import {
  ActivityType,
  type ApplicationCommandDataResolvable,
  Client,
  ClientEvents,
  Collection,
  GatewayIntentBits,
  Options,
} from "discord.js";
import { PrismaClient } from "@prisma/client";
import { promises as fs } from "node:fs";
import path from "node:path";
// @ts-ignore
import type { CommandType } from "./Command";
import i18next from "i18next";
import i18nbackend from "i18next-fs-backend";
import { readdirSync } from "node:fs";
import { Event } from "./Event";

export class SoulKitten extends Client {
  public commands: Collection<string, CommandType>;
  public owner: string[];
  public db: PrismaClient;

  constructor() {
    super({
      makeCache: Options.cacheWithLimits({
        ApplicationCommandManager: 0,
        BaseGuildEmojiManager: 0,
        GuildMemberManager: Number.POSITIVE_INFINITY,
        GuildStickerManager: 0,
        GuildScheduledEventManager: 0,
        MessageManager: Number.POSITIVE_INFINITY,
        StageInstanceManager: 0,
        ThreadManager: 0,
        ThreadMemberManager: 0,
        UserManager: 0,
      }),
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildVoiceStates,
      ],
      presence: {
        status: "idle",
        activities: [
          {
            name: "/ping - SoulKitten",
            type: ActivityType.Listening,
          },
        ],
      },
      allowedMentions: {
        parse: ["users"],
        repliedUser: false,
      },
    });
    this.commands = new Collection();
    this.db = new PrismaClient();
    this.owner = ["932678185970192404"];
  }

  async init() {
    this.register();
    await this.login(process.env.DISCORD_TOKEN); // token
  }

  async register() {
    this.loadLanguage();
    this.loadCommands();
    this.loadDatabase();
    this.loadEvents();
  }

  async loadDatabase() {
    try {
      // this.db.$connect();
    } catch (err) {}
  }

  async loadEvents() {
    const readDirRecursively = async (dir) => {
      const files = await fs.readdir(dir, { withFileTypes: true });
      let eventFiles = [];

      for (const file of files) {
        const fullPath = path.join(dir, file.name);
        if (file.isDirectory()) {
          // Chama a função recursivamente se for uma pasta
          const subFiles = await readDirRecursively(fullPath);
          eventFiles = [...eventFiles, ...subFiles];
        } else if (file.name.endsWith(".ts") || file.name.endsWith(".js")) {
          // Adiciona o arquivo caso seja .ts ou .js
          eventFiles.push(fullPath);
        }
      }
      return eventFiles;
    };

    const eventFiles = await readDirRecursively(
      path.join(__dirname, "../events"),
    );

    for (const file of eventFiles) {
      const event = await this.importFile(file);
      this.on(event.name, event.exec);
    }
  }

  async loadLanguage() {
    await i18next.use(i18nbackend).init({
      backend: {
        loadPath: "src/locales/{{lng}}/{{ns}}.json",
      },
      defaultNS: "language",
      fallbackLng: "en-US",
      interpolation: {
        escapeValue: false,
        useRawValueToEscape: true,
      },
      load: "all",
      ns: ["language"],
      preload: readdirSync("src/locales"),
      //	debug: true,
      returnEmptyString: false,
      returnObjects: true,
    });
  }

  async loadCommands() {
    const slashCommands: ApplicationCommandDataResolvable[] = [];

    const readDirRecursively = async (dir) => {
      const files = await fs.readdir(dir, { withFileTypes: true });
      let commandFiles = [];

      for (const file of files) {
        const fullPath = path.join(dir, file.name);
        if (file.isDirectory()) {
          const subFiles = await readDirRecursively(fullPath);
          commandFiles = [...commandFiles, ...subFiles];
        } else if (file.name.endsWith(".ts") || file.name.endsWith(".js")) {
          commandFiles.push(fullPath);
        }
      }
      return commandFiles;
    };

    const commandFiles = await readDirRecursively(
      path.join(__dirname, "../commands"),
    );

    for (const file of commandFiles) {
      const command = await this.importFile(file);

      if (!command.name) return;
      this.commands.set(command.name, command);
      slashCommands.push(command);
    }

    this.on("ready", () => {
      this.application.commands.set(slashCommands);
    });
  }

  async importFile(file: string) {
    return (await import(file))?.default;
  }
}
