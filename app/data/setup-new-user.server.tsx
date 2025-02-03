import { redis } from "~/redis.server";
import { defaultTextHandlers } from "./text-handlers.server";
import { User, TextHandler } from "~/types";

const setupNewUser = async (userKey: string, country?: string | null): 
  Promise<{ user: User | null, textHandlers: TextHandler[], favs: string[], reposts: string[], events: string[] }> => {

  await redis.incr("userCount");
  const incr = await redis.get("userCount");

  await redis.hset(`user:${userKey}`, {
    created: new Date().toISOString(),
    lastSeen: new Date().toISOString(),
    name: `noob${incr}`,
    bio: "I'm new here!",
    posts: 0,
    id: userKey,
    country: country,
    money: 0
  });

  const user = await redis.hgetall(`user:${userKey}`) as User | null;
  
  const jsonString = JSON.stringify(defaultTextHandlers);
  await redis.set(`user:${userKey}:textHandlers`, jsonString);
  
  return {
    user,
    textHandlers: defaultTextHandlers as TextHandler[],
    favs: [],
    reposts: [],
    events: []
  };
}


export default setupNewUser;