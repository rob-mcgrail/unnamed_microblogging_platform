import type {
  ActionFunctionArgs,
} from "@remix-run/node";
import { v4 as uuidv4 } from "uuid";

import { redis } from "~/redis.server";
import { TextHandler } from "~/types";
import fetchUserKeyFromRequest from "~/data/fetch-user-key-from-request.server";
import fetchExistingUser from "~/data/fetch-existing-user.server";
import { processContent } from "~/utils/process-content";

export const action = async ({
  request,
}: ActionFunctionArgs) => {
  const userKey = await fetchUserKeyFromRequest(request);
  const formData = await request.formData();
  const { content } = Object.fromEntries(formData);
  const { textHandlers} = await fetchExistingUser(userKey);
  const output = processContent(content as string, textHandlers as TextHandler[]);

  // if content != output, rename user to haxor
  if (content !== output.text) {
    await redis.hset(`user:${userKey}`, { name: 'haxor' });
  }

  const name = await redis.hget(`user:${userKey}`, "name");
  const postId = uuidv4();
  
  const post = {
    id: postId,
    authorId: userKey,
    content: output.text,
    created: new Date().toISOString(),
    name: name,
    replies: 0,
    favs: 0,
    reposts: 0,
    flags: '',
    repliesTo: null,
    repostOf: '',
    repost: false,
  }

  await redis.hset(`post:${userKey}:${postId}`, post);
  await redis.lpush(`timeline`, `post:${userKey}:${postId}`);
  await redis.lpush(`timeline:${userKey}`, `post:${userKey}:${postId}`);

  const updatedHandlers = output.textHandlers.map((handler) => {
    handler.persistentCount = handler.activeCount;
    return handler;
  }).filter((handler) => handler.activeCount > 0);

  await redis.json.set(`user:${userKey}:textHandlers`, '$', updatedHandlers as []);

  // increment users post count
  await redis.hincrby(`user:${userKey}`, "posts", 1);

  return { };
};