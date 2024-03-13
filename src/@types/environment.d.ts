declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DISCORD_TOKEN: string;
      GEMINI_TOKEN: string;
      MONGO_URL: string;
    }
  }
}

export {}