import React from "react";
import Post from "~/components/post";
import { Post as PostType } from "~/types";

interface PostsProps {
  posts: PostType[];
  favs: string[];
  children?: React.ReactNode;
}

const Posts: React.FC<PostsProps> = ({ posts, favs, children }) => {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-800 rounded-lg p-4">
      {children && <div className="mb-4">{children}</div>}

      <ul className="space-y-4">
        {posts.map((post) => (
          <Post key={post.id} post={post} favorite={favs.includes(post.id)} />
        ))}
      </ul>
    </div>
  );
};

export default Posts;