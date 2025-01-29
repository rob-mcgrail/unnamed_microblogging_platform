import {
  useLoaderData,
  useRevalidator,
} from "@remix-run/react";
import { useEffect } from "react";
import { json } from "@remix-run/node";

import { Post } from "~/types";
import Posts from "~/components/posts";
import PostForm from "~/components/post-form";

import fetchPostsForKey from "~/data/fetch-posts-for-key.server";

export async function loader({ request }: { request: Request }) {
  const posts = await fetchPostsForKey(request, 'timeline');
  return json({ posts: posts });
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
    <div className="flex-1 bg-gray-900 p-4 flex flex-col">
      <PostForm limit={100} />
      <Posts posts={posts} />
    </div>
  );
}

export default Timeline;