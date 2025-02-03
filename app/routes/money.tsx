import { json, LoaderFunctionArgs } from "@remix-run/node";

import { sessionCookie } from "~/cookies";
import { redis } from "~/redis.server";
import { User } from "~/types";

import fetchExistingUser from "~/data/fetch-existing-user.server";
import fetchUserKeyFromSession from "~/data/fetch-user-key-from-session.server";
import processEvents from "~/utils/process-events";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const cookieHeader = request.headers.get("Cookie");
  const sessionId = await sessionCookie.parse(cookieHeader);
  const userKey = await fetchUserKeyFromSession(sessionId);
  const data = await fetchExistingUser(userKey) as { user: User };
  const events = await redis.lrange(`events:${userKey}`, 0, -1);
  await redis.del(`events:${userKey}`);
  let money = data.user.money;
  
  if (events.length > 0) {
    money = processEvents(data.user as User, events as string[], []);
    await redis.hset(`user:${userKey}`, { money });
  }

  return json({ money });
};