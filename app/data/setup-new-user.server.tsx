import { redis } from "~/redis.server";
import { defaultTextHandlers } from "./text-handlers.server";
import { User, TextHandler } from "~/types";

const setupNewUser = async (userKey: string): Promise<{ user: User | null, textHandlers: TextHandler[] }> => {
  await redis.incr("userCount");
  const incr = await redis.get("userCount");

  await redis.hset(`user:${userKey}`, {
    created: new Date().toISOString(),
    lastSeen: new Date().toISOString(),
    name: `noob${incr}`,
    bio: "I'm new here!",
    posts: 0
  });

  const user = await redis.hgetall(`user:${userKey}`) as User | null;

  await redis.json.set(`user:${userKey}:textHandlers`, '$', defaultTextHandlers);
  
  return {
    user,
    textHandlers: defaultTextHandlers
  };
}


export default setupNewUser;