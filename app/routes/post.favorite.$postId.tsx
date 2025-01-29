import type {
  ActionFunctionArgs,
} from "@remix-run/node";

import { redis } from "~/redis.server";
import fetchUserKeyFromRequest from "~/data/fetch-user-key-from-request.server";
import fetchExistingUser from "~/data/fetch-existing-user.server";

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

  const added = await redis.sadd(`favs:${userKey}`, `${postId}`);

  if (added > 0) {
    await redis.hincrby(`post:${postId}`, "favs", 1);
  }
  return { };
};