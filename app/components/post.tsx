import { useFetcher } from "@remix-run/react";
import { Post as PostType } from "~/types";

export interface PostProps {
  post: PostType;
  favorite: boolean;
}

const Post: React.FC<PostProps> = ({ post, favorite }) => {
  const { name, authorId, content } = post;
  const fetcher = useFetcher();

  return (
    <li className="bg-gray-700 p-4 rounded-lg text-white">
      <a href={`/timeline/${authorId}`}>
        <h2 className="text-xl">{name}</h2>
      </a>
      <p className="whitespace-pre">{content}</p>

      <div className="flex justify-around p-2">
        <fetcher.Form method="post" action={`/post/favorite/${post.id}`}>
          <button
            type="submit"
            className={`px-2 ${!favorite ? "saturate-0" : ""} ${
              favorite ? "cursor-default" : "cursor-pointer"
            }`}
          >
            ⭐ {post.favs}
          </button>
        </fetcher.Form>
      </div>
    </li>
  );
};

export default Post;