import {
  useLoaderData
} from "@remix-run/react";
import { json } from "@remix-run/node";

import { redis } from "~/redis.server";
import { Post } from "~/types";
import PostForm from "~/components/post-form";
import Posts from "~/components/posts";

import fetchUserKeyFromRequest from "~/data/fetch-user-key-from-request.server";

export async function loader({ request }: { request: Request }) {
  const userKey = await fetchUserKeyFromRequest(request);

  const postKeys = await redis.lrange('timeline', 0, 50);

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
  
  return (
    <div className="flex-1 bg-gray-900 p-4 flex flex-col">
      <PostForm limit={100} id={123} />
      <Posts posts={posts} />
    </div>
  );
}

export default Timeline;