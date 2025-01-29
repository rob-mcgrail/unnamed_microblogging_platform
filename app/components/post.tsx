import { Post as PostType } from "~/types";

export interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ( { post } ) => {
  const { name, authorId, content } = post;
  return (
    <li className="bg-gray-700 p-4 rounded-lg text-white">
      <a href={`/timeline/${authorId}`}>
        <h2 className="text-xl">{name}</h2>
      </a>
      <p className="whitespace-pre">{content}</p>
    </li>
  );
};

export default Post;