import type {
  ActionFunctionArgs,
} from "@remix-run/node";

import { redis } from "~/redis.server";
import fetchUserKeyFromRequest from "~/data/fetch-user-key-from-request.server";
import fetchExistingUser from "~/data/fetch-existing-user.server";
import dispatchEvent from "~/data/dispatch-event.server";

export const action = async ({
  request,
  params
}: ActionFunctionArgs) => {
  const userKey = await fetchUserKeyFromRequest(request);
  const { user } = await fetchExistingUser(userKey);

  if (!user) {
    return { };
  }

  const postId = params.postId as string;

  const subject = await redis.hget(`post:${postId}`, "authorId");
  await dispatchEvent("fav", userKey, subject);

  const added = await redis.sadd(`favs:${userKey}`, `${postId}`);

  if (added > 0) {
    await redis.hincrby(`post:${postId}`, "favs", 1);
  } else {
    const pipeline = redis.pipeline();
    pipeline.srem(`favs:${userKey}`, `${postId}`);
    pipeline.hincrby(`post:${postId}`, "favs", -1);
    pipeline.exec();
  }
  return { };
};