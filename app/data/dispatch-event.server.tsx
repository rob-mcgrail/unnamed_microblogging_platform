import { redis } from "~/redis.server";

const dispatchEvent = async (
  event: 'fav' | 'reply' | 'repost' | 'post',
  actor: string,
  subject?: string
) => {
  const eventString = JSON.stringify({ 
    event, subject, actor, created: new Date().toISOString()
  });
  const pipeline = redis.pipeline();

  pipeline.lpush(`events`, eventString);
  pipeline.lpush(`events:${actor}`, eventString);
  pipeline.lpush(`events:${subject}`, eventString);

  await pipeline.exec();

  return true;
}


export default dispatchEvent;