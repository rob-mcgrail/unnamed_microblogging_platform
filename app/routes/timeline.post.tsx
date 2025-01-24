import type {
  ActionFunctionArgs,
} from "@remix-run/node";
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

  // increment users post count

  // create the damn post, and add it to the timeline list

  // add it to a user's post list too.

  const updatedHandlers = output.textHandlers.map((handler) => {
    handler.persistentCount = handler.activeCount;
    return handler;
  }).filter((handler) => handler.activeCount > 0);

  await redis.json.set(`user:${userKey}:textHandlers`, '$', updatedHandlers as []);

  return { };
};