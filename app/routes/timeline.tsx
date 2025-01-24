
import PostForm from "~/components/post-form";
import Posts from "~/components/posts";

import { examplePosts } from "~/data/test-data";

export function Timeline() {
  return (
    <div className="flex-1 bg-gray-900 p-4 flex flex-col">
      <PostForm limit={100} id={123} />
      <Posts posts={examplePosts} />
    </div>
  );
}

export default Timeline;