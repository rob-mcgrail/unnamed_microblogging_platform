import { redis } from "~/redis.server";
import { Post } from "~/types";
import fetchUserKeyFromRequest from "~/data/fetch-user-key-from-request.server";

const fetchPostsForKey = async (request: Request, timelineKey: string): Promise<Post[]> => {
  const userKey = await fetchUserKeyFromRequest(request);

  const postKeys = await redis.lrange(timelineKey, 0, 100);

  const pipeline = redis.pipeline();
  postKeys.forEach((postId: string) => {
    pipeline.hgetall(postId); 
  });

  const results = await pipeline.exec();

  const posts = results
    .map(([err, post]: [Error | null, Post | null]) => (err ? null : post)) 
    .filter((post: Post | null) => post !== null) as Post[];

  return posts;
}

export default fetchPostsForKey;