import { useFetcher } from "@remix-run/react";
import { Post as PostType } from "~/types";

export interface PostProps {
  post: PostType;
  favorite: boolean;
  reposted: boolean;
}

const Post: React.FC<PostProps> = ({ post, favorite, reposted }) => {
  const { name, authorId, content, repost, repostedByName } = post;
  const fetcher = useFetcher();

  const favorites = (
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
  );

  const reposts = (
    <fetcher.Form method="post" action={`/post/repost/${post.id}`}>
    <button
      type="submit"
      className={`text-green-500 px-2 ${(reposted || repost) ? "saturate-100" : "saturate-0"}`}
    >
      ♻️ {post.reposts}
    </button>
  </fetcher.Form>
  );

  return (
    <li className="bg-gray-700 p-4 rounded-lg text-white">
      <a href={`/timeline/${authorId}`}>
        <h2 className="text-xl">{name}{repost && repostedByName && ` ♻️ by ${repostedByName}`}</h2>
      </a>
      <p className="whitespace-pre">{content}</p>

      <div className="flex justify-around p-2">
        {reposts}
        {favorites}
      </div>
    </li>
  );
};

export default Post;