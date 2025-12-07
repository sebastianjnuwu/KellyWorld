declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DISCORD_TOKEN: string;
      MONGO_URL: string;
    }
  }
}

export {};
