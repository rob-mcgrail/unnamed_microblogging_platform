import Post from '~/components/post';
import { Post as PostType } from "~/types";


interface PostsProps {
  posts: PostType[];
}

const Posts: React.FC<PostsProps> = ({ posts }) => {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-800 rounded-lg p-4">
      <ul className="space-y-4">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
};

export default Posts;