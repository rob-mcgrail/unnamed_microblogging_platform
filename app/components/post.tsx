import { Post as PostType } from "~/types";

export interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ( { post } ) => {
  const { name, content } = post;
  return (
    <li className="bg-gray-700 p-4 rounded-lg text-white">
      <h2 className="font-bold">{name}</h2>
      <p className="whitespace-pre">{content}</p>
    </li>
  );
};

export default Post;