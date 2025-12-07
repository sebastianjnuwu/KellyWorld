import { ActivityType, Client, GatewayIntentBits, Options } from "discord.js";
import prisma from "../../prisma.config";
import { promises as fs } from "node:fs";
import path from "node:path";
import i18next from "i18next";
import i18nbackend from "i18next-fs-backend";
import { readdirSync } from "node:fs";

export class SoulKitten extends Client {
  public owner: string[];
  public db: typeof prisma;

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
            name: "SoulKitten",
            type: ActivityType.Listening,
          },
        ],
      },
      allowedMentions: {
        parse: ["users"],
        repliedUser: false,
      },
    });
    this.db = prisma;
    this.owner = ["932678185970192404"];
  }

  async init() {
    this.register();
    await this.login(process.env.DISCORD_TOKEN);
  }

  async register() {
    this.loadLanguage();
    this.loadEvents();
  }

  async loadEvents() {
    const readDirRecursively = async (dir) => {
      const files = await fs.readdir(dir, { withFileTypes: true });
      let eventFiles = [];

      for (const file of files) {
        const fullPath = path.join(dir, file.name);
        if (file.isDirectory()) {
          const subFiles = await readDirRecursively(fullPath);
          eventFiles = [...eventFiles, ...subFiles];
        } else if (file.name.endsWith(".ts") || file.name.endsWith(".js")) {
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

  async importFile(file: string) {
    return (await import(file))?.default;
  }
}
