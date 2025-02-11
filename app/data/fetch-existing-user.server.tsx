import { redis } from "~/redis.server";
import { User, TextHandler, Modifier } from "~/types";
import { modifiers } from '~/data/modifiers.server';

const fetchExistingUser = async (
  userKey: string,
  country?: string | null
): Promise<{
  user: User | null;
  textHandlers: TextHandler[];
  favs: string[];
  reposts: string[];
  modifiers: Modifier[];
}> => {
  const userKeyRedis = `user:${userKey}`;

  // Using pipeline to batch Redis commands
  const pipeline = redis.pipeline();
  pipeline.hgetall(userKeyRedis);
  pipeline.get(`${userKeyRedis}:textHandlers`);
  pipeline.smembers(`favs:${userKey}`);
  pipeline.smembers(`reposts:${userKey}`);

  const [userData, jsonString, favs, reposts, events] = await pipeline.exec();

  const user = (userData[1] as User) || null;

  if (!user) {
    return {
      user: null,
      textHandlers: [],
      modifiers: modifiers as Modifier[],
      favs: [],
      reposts: []
    };
  }


  // Update last seen time and country if provided
  const updateData: Record<string, string> = { lastSeen: new Date().toISOString() };
  if (country) updateData.country = country;

  await redis.hset(userKeyRedis, updateData);

  return {
    user,
    textHandlers: jsonString[1] ? (JSON.parse(jsonString[1]) as TextHandler[]) : [],
    modifiers: modifiers as Modifier[],
    favs: favs[1] || [],
    reposts: reposts[1] || [],
  };
};

export default fetchExistingUser;