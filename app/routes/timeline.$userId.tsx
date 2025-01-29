import {
  useLoaderData,
  useRevalidator,
} from "@remix-run/react";
import { useEffect } from "react";
import { json, LoaderFunctionArgs } from "@remix-run/node";

import { Post, User } from "~/types";
import Posts from "~/components/posts";
import UserInfo from "~/components/user-info";

import fetchPostsForKey from "~/data/fetch-posts-for-key.server";
import fetchExistingUser from "~/data/fetch-existing-user.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const userId = params.userId;
  
  const { user } = await fetchExistingUser(userId as string);
  const posts = await fetchPostsForKey(request, `timeline:${userId}`);
  return json({ posts: posts, user: user });
}

export function Timeline() {
  const { posts, user } = useLoaderData<typeof loader>() as { posts: Post[], user: User | null };
  const revalidator = useRevalidator();

  useEffect(() => {
    const interval = setInterval(() => {
      revalidator.revalidate();
    }, 5000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 bg-gray-900 p-4 flex flex-col">
      <Posts posts={posts}>
        { user && (
          <div className="pb-8 items-center">
            <UserInfo user={user} />
          </div>
        )}

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