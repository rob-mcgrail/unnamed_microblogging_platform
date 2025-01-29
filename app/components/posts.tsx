import React from "react";
import Post from "~/components/post";
import { Post as PostType } from "~/types";

interface PostsProps {
  posts: PostType[];
  children?: React.ReactNode; // Allow children to be passed
}

const Posts: React.FC<PostsProps> = ({ posts, children }) => {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-800 rounded-lg p-4">
      {children && <div className="mb-4">{children}</div>} {/* Render children if provided */}

      <ul className="space-y-4">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
};

export default Posts;