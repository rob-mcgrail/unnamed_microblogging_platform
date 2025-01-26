import { redis } from "~/redis.server";
import { User, TextHandler } from "~/types";

const fetchExistingUser = async (userKey: string): Promise<{ user: User | null, textHandlers: TextHandler[] }> => {
  await redis.hset(`user:${userKey}`, { lastSeen: new Date().toISOString() });
  const user = await redis.hgetall(`user:${userKey}`) as User | null;

  // const textHandlers = await redis.call("JSON.GET", `user:${userKey}:textHandlers`) as TextHandler[];
  const jsonString = await redis.get(`user:${userKey}:textHandlers`);
  const textHandlers = JSON.parse(jsonString) as TextHandler[];
  return {
    user,
    textHandlers
  };
}

export default fetchExistingUser;