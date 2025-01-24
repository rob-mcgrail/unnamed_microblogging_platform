import { redis } from "~/redis.server";

const fetchExistingUser = async (userKey: string) => {
  await redis.hset(`user:${userKey}`, { lastSeen: new Date().toISOString() });
  const user = await redis.hgetall(`user:${userKey}`);
  const textHandlers = await redis.json.get(`user:${userKey}:textHandlers`)
  return {
    user,
    textHandlers
  };
}


export default fetchExistingUser;