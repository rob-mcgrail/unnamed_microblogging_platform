import Redis from "ioredis";

if (!(global as any).redis) {
  (global as any).redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : undefined,
    username: "default",
    password: process.env.REDIS_PASSWORD,
    connectTimeout: 5000,
    disconnectTimeout: 1000,
    tls: {}
  });
}

export const redis = (global as any).redis;
