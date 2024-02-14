declare global {
  namespace NodeJS {
    interface ProcessEnv {
      token: string;
      mongo_url: string;
    }
  }
}

export {}