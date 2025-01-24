import { redis } from "~/redis.server";
import { sessionCookie } from "~/cookies";

const fetchUserKeyFromRequest = async (request: Request):Promise<string> => {
  const cookieHeader = request.headers.get("Cookie");
  const sessionId = await sessionCookie.parse(cookieHeader);
  
  let userKey = await redis.get(`session:${sessionId}`) as string;

  if (!userKey) {
    userKey = "cursed-user";
  }
  return userKey;
}


export default fetchUserKeyFromRequest;