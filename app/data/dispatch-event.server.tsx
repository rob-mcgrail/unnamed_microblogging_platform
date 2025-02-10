import { redis } from "~/redis.server";

import { Event } from "~/types";

const dispatchEvent = async (eventData: Event) => {
  const eventString = JSON.stringify({
    ...eventData,
    created: new Date().toISOString(),
  });
  
  const pipeline = redis.pipeline();
  
  pipeline.lpush("events", eventString);
  
  if (eventData.actor) {
    pipeline.lpush(`events:${eventData.actor}`, eventString);
  }
  
  if (eventData.actor && eventData.actor !== eventData.subject) {
    pipeline.lpush(`events:${eventData.subject}`, eventString);
  }

  await pipeline.exec();
  return true;
};

export default dispatchEvent;
