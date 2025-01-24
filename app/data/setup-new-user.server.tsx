import { redis } from "~/redis.server";
import { defaultTextHandlers } from "./text-handlers.server";

const setupNewUser = async (userKey: string) => {
  await redis.incr("userCount");
  const incr = await redis.get("userCount");

  await redis.hset(`user:${userKey}`, {
    created: new Date().toISOString(),
    lastSeen: new Date().toISOString(),
    name: `noob${incr}`,
    bio: "I'm new here!"
  });

  const user = await redis.hgetall(`user:${userKey}`);

  await redis.json.set(`user:${userKey}:textHandlers`, '$', defaultTextHandlers);
  
  return {
    user,
    textHandlers: defaultTextHandlers
  };
}


export default setupNewUser;