import type {
  ActionFunctionArgs,
} from "@remix-run/node";

import { v4 as uuidv4 } from "uuid";

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

  const post = await redis.hgetall(`post:${postId}`);

  if (post.authorId == user.id) {
    return {};
  }

  const added = await redis.sadd(`reposts:${userKey}`, `${postId}`);

  if (post.repostedBy == user.id) {
    const pipeline = redis.pipeline();

    pipeline.srem(`reposts:${userKey}`, `${post.repostOf}`);
    pipeline.hincrby(`post:${post.repostOf}`, "reposts", -1);
    pipeline.lrem(`timeline`, 0, `post:${postId}`);
    pipeline.lrem(`timeline:${userKey}`, 0, `post:${postId}`);

    await pipeline.exec();

    return {};
  }

  if (added > 0) {
    await redis.hincrby(`post:${postId}`, "reposts", 1);
  }
  else {
    return {};
  }

  const repostId = uuidv4();
  const repost = {
    id: repostId,
    authorId: post.authorId,
    content: post.content,
    created: post.created,
    name: post.name,
    replies: post.replies,
    favs: post.favs,
    reposts: Number(post.reposts) + 1,
    flags: '',
    repliesTo: post.repliesTo,
    repostedByName: user.name,
    repostedBy: user.id,
    repostOf: post.id,
    repost: true,
  }

  const pipeline = redis.pipeline();
  const postKey = `post:${repostId}`;
  pipeline.hset(postKey, repost);
  
  pipeline.lpush(`timeline`, postKey);
  pipeline.lpush(`timeline:${userKey}`, postKey);
  
  await pipeline.exec();

  await dispatchEvent(
    { event: "repost", actor: userKey, actorName: user.name, object: postKey, subject: post.authorId, subjectName: post.name }
  );

  return { };
};