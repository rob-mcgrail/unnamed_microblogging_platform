import Post, { PostProps } from '~/components/post';


interface PostsProps {
  posts: PostProps[] | [];
}

const Posts: React.FC<PostsProps> = ({ posts }) => {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-800 rounded-lg p-4">
      <ul className="space-y-4">
        {posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </ul>
    </div>
  );
};

export default Posts;