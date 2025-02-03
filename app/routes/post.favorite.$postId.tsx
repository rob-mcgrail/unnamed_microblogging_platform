import type { ActionFunctionArgs } from "@remix-run/node";

import { redis } from "~/redis.server";
import fetchUserKeyFromRequest from "~/data/fetch-user-key-from-request.server";
import fetchExistingUser from "~/data/fetch-existing-user.server";
import dispatchEvent from "~/data/dispatch-event.server";

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const userKey = await fetchUserKeyFromRequest(request);
  const { user } = await fetchExistingUser(userKey);

  if (!user) {
    return {};
  }

  const postId = params.postId as string;

  // Using pipeline to batch Redis commands
  const pipeline = redis.pipeline();
  pipeline.hmget(`post:${postId}`, "authorId", "name");
  pipeline.sadd(`favs:${userKey}`, postId);

  const [[, [subject, name]], [, added]] = await pipeline.exec();
  await dispatchEvent("fav", userKey, user.name, subject, name);

  if (added > 0) {
    await redis.hincrby(`post:${postId}`, "favs", 1);
  } else {
    const pipeline = redis.pipeline();
    pipeline.srem(`favs:${userKey}`, postId);
    pipeline.hincrby(`post:${postId}`, "favs", -1);
    await pipeline.exec();
  }

  return {};
};
