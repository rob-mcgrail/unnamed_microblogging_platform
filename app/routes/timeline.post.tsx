import type {
  ActionFunctionArgs,
} from "@remix-run/node";
import { v4 as uuidv4 } from "uuid";

import { redis } from "~/redis.server";
import { TextHandler } from "~/types";
import fetchUserKeyFromRequest from "~/data/fetch-user-key-from-request.server";
import fetchExistingUser from "~/data/fetch-existing-user.server";
import { processContent } from "~/utils/process-content";
import dispatchEvent from "~/data/dispatch-event.server";

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

  if (output.text.length < 1) {
    // noop if it's empty
    return { };
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
    repost: null,
  }

  const pipeline = redis.pipeline();

  const postKey = `post:${postId}`;

  pipeline.hset(postKey, post);
  
  pipeline.lpush(`timeline`, postKey);
  pipeline.lpush(`timeline:${userKey}`, postKey);
  
  const updatedHandlers = output.textHandlers
    .map((handler) => {
      handler.persistentCount = handler.activeCount;
      return handler;
    })
    .filter((handler) => handler.activeCount > 0);
  
  const jsonString = JSON.stringify(updatedHandlers);
  pipeline.set(`user:${userKey}:textHandlers`, jsonString);
  
  pipeline.hincrby(`user:${userKey}`, "posts", 1);
  
  await pipeline.exec();

  await dispatchEvent(
    { event: "post", actor: userKey, actorName: name, object: postKey, subject: post.authorId, subjectName: post.name }
  );

  return { };
};