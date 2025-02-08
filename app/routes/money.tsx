import { json, LoaderFunctionArgs } from "@remix-run/node";

import { sessionCookie } from "~/cookies";
import { redis } from "~/redis.server";
import fetchUserKeyFromSession from "~/data/fetch-user-key-from-session.server";
import processEvents from "~/utils/process-events";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const cookieHeader = request.headers.get("Cookie");
  const sessionId = await sessionCookie.parse(cookieHeader);
  const userKey = await fetchUserKeyFromSession(sessionId);
  let events = await redis.lrange(`events:${userKey}`, 0, -1);
  await redis.del(`events:${userKey}`);
  let initialMoney = await redis.hget(`user:${userKey}`, 'money');
  let money = parseInt(initialMoney as string);

  if (events.length > 0) {
    const parsedEvents = events.map((e: string) => JSON.parse(e))
    const result = processEvents(initialMoney, userKey, parsedEvents, []);
    events = result.events;
    money = result.money;
    await redis.hset(`user:${userKey}`, { money });
  }

  return json({ money, events });
};