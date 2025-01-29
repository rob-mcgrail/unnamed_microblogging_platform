import {
  useLoaderData,
  useRevalidator,
} from "@remix-run/react";
import { useEffect } from "react";
import { json, LoaderFunctionArgs } from "@remix-run/node";

import { Post } from "~/types";
import Posts from "~/components/posts";

import fetchPostsForKey from "~/data/fetch-posts-for-key.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const userId = params.userId;

  const posts = await fetchPostsForKey(request, `timeline:${userId}`);
  return json({ posts: posts });
}

export function Timeline() {
  const { posts } = useLoaderData<typeof loader>() as { posts: Post[] };
  const revalidator = useRevalidator();

  useEffect(() => {
    const interval = setInterval(() => {
      revalidator.revalidate();
    }, 30000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 bg-gray-900 p-4 flex flex-col">
      <Posts posts={posts}>
        <a
          href="/timeline/global"
          className="w-auto flex items-center justify-center gap-2 px-4 py-3 bg-gray-600 hover:bg-gray-500 text-gray-300 rounded-lg font-medium transition-all"
        >
          <span>🔙 Go Back</span>
        </a>
      </Posts>
    </div>
  );
}

export default Timeline;