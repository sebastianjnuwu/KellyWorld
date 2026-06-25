import {
  ActivityType,
  Client,
  type ClientEvents,
  GatewayIntentBits,
  Options,
} from "discord.js";
import { PrismaClient } from "@prisma/client";
import { promises as fs } from "node:fs";
import path from "node:path";
import i18next from "i18next";
import i18nbackend from "i18next-fs-backend";
import { readdirSync } from "node:fs";

const prisma = new PrismaClient({});

interface EventModule<K extends keyof ClientEvents = keyof ClientEvents> {
  name: K;
  exec: (...args: ClientEvents[K]) => void | Promise<void>;
}

export class SoulKitten extends Client {
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
            name: "🎮 Jogando na caBRAPI.",
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

  async init(): Promise<void> {
    await this.register();
    await this.login(process.env.DISCORD_TOKEN);
  }

  async register(): Promise<void> {
    await Promise.all([
      this.loadDatabase(),
      this.loadLanguage(),
      this.loadEvents(),
    ]);
  }

  async loadDatabase(): Promise<void> {
    try {
      await this.db.$connect();
      console.log("[Database] Connected successfully.");
    } catch (error) {
      console.error("[Database] Error connecting:", error);
      process.exit(1); 
    }
  }

  async loadEvents(): Promise<void> {
    const readDirRecursively = async (dir: string): Promise<string[]> => {
      const files = await fs.readdir(dir, { withFileTypes: true });
      const eventFiles: string[] = [];

      for (const file of files) {
        const fullPath = path.join(dir, file.name);
        if (file.isDirectory()) {
          const subFiles = await readDirRecursively(fullPath);
          eventFiles.push(...subFiles);
        } else if (file.name.endsWith(".ts") || file.name.endsWith(".js")) {
          eventFiles.push(fullPath);
        }
      }

      return eventFiles;
    };

    const eventFiles = await readDirRecursively(
      path.join(__dirname, "../events")
    );

    for (const file of eventFiles) {
      const event = await this.importFile<EventModule>(file);

      if (!event?.name || typeof event.exec !== "function") {
        console.warn(`[Events] Arquivo inválido ignorado: ${file}`);
        continue;
      }

      this.on(event.name, event.exec as (...args: unknown[]) => void);
    }
  }

  async loadLanguage(): Promise<void> {
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
      returnEmptyString: false,
      returnObjects: true,
    });
  }

  async importFile<T>(file: string): Promise<T> {
    return (await import(file))?.default as T;
  }
}