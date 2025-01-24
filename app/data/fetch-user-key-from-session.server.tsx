import { redis } from "~/redis.server";

const fetchUserKeyFromSession = async (sessionId: string):Promise<string> => {
  let userKey = await redis.get(`session:${sessionId}`) as string;
  if (!userKey) {
    userKey = "cursed-user";
  }
  return userKey;
}


export default fetchUserKeyFromSession;