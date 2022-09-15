export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      DATABASE_URL: string;
      JWT_SECRET: string;
      NODE_ENV: "dev" | "test";
    }
  }
}
