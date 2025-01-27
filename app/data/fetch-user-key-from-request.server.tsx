import { redis } from "~/redis.server";
import { sessionCookie } from "~/cookies";
import fetchUserKeyFromSession from "./fetch-user-key-from-session.server";

const fetchUserKeyFromRequest = async (request: Request):Promise<string> => {
  const cookieHeader = request.headers.get("Cookie");
  const sessionId = await sessionCookie.parse(cookieHeader);
  
  let userKey = await fetchUserKeyFromSession(sessionId)

  return userKey;
}


export default fetchUserKeyFromRequest;