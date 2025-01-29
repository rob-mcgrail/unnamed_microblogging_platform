import {
  useLoaderData,
  useRevalidator,
} from "@remix-run/react";
import { useEffect } from "react";
import { json } from "@remix-run/node";

import { redis } from "~/redis.server";
import { Post } from "~/types";
import Posts from "~/components/posts";

import fetchUserKeyFromRequest from "~/data/fetch-user-key-from-request.server";

export async function loader({ request }: { request: Request }) {
  const userKey = await fetchUserKeyFromRequest(request);

  const postKeys = await redis.lrange('timeline', 0, 100);

  const pipeline = redis.pipeline();
  postKeys.forEach((postId: string) => {
    pipeline.hgetall(postId); 
  });

  const results = await pipeline.exec();

  const posts = results
    .map(([err, post]: [Error | null, Post | null]) => (err ? null : post)) 
    .filter((post: Post | null) => post !== null) as Post[]; 

  return json({ posts });
}

export function Timeline() {
  const { posts } = useLoaderData<typeof loader>() as { posts: Post[] };
  const revalidator = useRevalidator();

  useEffect(() => {
    const interval = setInterval(() => {
      revalidator.revalidate();
    }, 3000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <Posts posts={posts} />
  );
}

export default Timeline;