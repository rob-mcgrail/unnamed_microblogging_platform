import {
  useLoaderData,
  useRevalidator,
} from "@remix-run/react";
import { useEffect } from "react";
import { json } from "@remix-run/node";

import { Post } from "~/types";
import Posts from "~/components/posts";
import PostForm from "~/components/post-form";

import { redis } from "~/redis.server";
import fetchPostsForKey from "~/data/fetch-posts-for-key.server";
import fetchUserKeyFromRequest from "~/data/fetch-user-key-from-request.server";

export async function loader({ request }: { request: Request }) {
  const posts = await fetchPostsForKey(request, 'timeline');
  const userKey = await fetchUserKeyFromRequest(request);
  const favs = await redis.smembers(`favs:${userKey}`);
  const reposts = await redis.smembers(`reposts:${userKey}`);

  return json({ posts: posts, favs: favs, reposts: reposts });
}

export function Timeline() {
  const { posts, favs, reposts } = useLoaderData<typeof loader>() as { posts: Post[], favs: string[], reposts: string[] };
  const revalidator = useRevalidator();

  useEffect(() => {
    const interval = setInterval(() => {
      revalidator.revalidate();
    }, 3000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 bg-gray-900 p-4 flex flex-col">
      <PostForm limit={100} />
      <Posts favs={favs} posts={posts} reposts={reposts} />
    </div>
  );
}

export default Timeline;