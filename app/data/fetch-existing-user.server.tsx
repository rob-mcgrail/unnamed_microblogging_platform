import { redis } from "~/redis.server";
import { User, TextHandler } from "~/types";

const fetchExistingUser = async (userKey: string, country?: string | null): Promise<{ user: User | null, textHandlers: TextHandler[] }> => {
  const user = await redis.hgetall(`user:${userKey}`) as User | null;
  
  if (!user) {
    return {
      user: null,
      textHandlers: []
    };
  }

  if (country) {
    await redis.hset(`user:${userKey}`, { lastSeen: new Date().toISOString(), country });
  }
  else {
    await redis.hset(`user:${userKey}`, { lastSeen: new Date().toISOString() });
  }

  const jsonString = await redis.get(`user:${userKey}:textHandlers`);
  const textHandlers = JSON.parse(jsonString) as TextHandler[];
  return {
    user,
    textHandlers
  };
}

export default fetchExistingUser;