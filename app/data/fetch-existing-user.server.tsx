import { redis } from "~/redis.server";
import { User, TextHandler } from "~/types";

const fetchExistingUser = async (userKey: string, country?: string | null): 
  Promise<{ user: User | null, textHandlers: TextHandler[], favs: string[], reposts: string[] }> => {

  const user = await redis.hgetall(`user:${userKey}`) as User | null;
  
  if (!user) {
    return {
      user: null,
      textHandlers: [],
      favs: [],
      reposts: []
    };
  }

  if (country) {
    await redis.hset(`user:${userKey}`, { lastSeen: new Date().toISOString(), country });
  }
  else {
    await redis.hset(`user:${userKey}`, { lastSeen: new Date().toISOString() });
  }

  const jsonString = await redis.get(`user:${userKey}:textHandlers`);
  const favs = await redis.smembers(`favs:${userKey}`);
  const reposts = await redis.smembers(`reposts:${userKey}`);

  const textHandlers = JSON.parse(jsonString) as TextHandler[];
  return {
    user,
    textHandlers,
    favs,
    reposts
  };
}

export default fetchExistingUser;