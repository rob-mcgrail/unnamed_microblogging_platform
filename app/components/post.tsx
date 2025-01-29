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

  let optFavorite = favorite;
  let optFavs = Number(post.favs);

  if (fetcher.formAction === `/post/favorite/${post.id}` && fetcher.state) {
    optFavs += optFavorite ? -1 : 1;
    optFavorite = !optFavorite;
  }

  const favorites = (
    <fetcher.Form method="post" action={`/post/favorite/${post.id}`}>
    <button
      type="submit"
      className={`px-2 ${!optFavorite ? "saturate-0" : ""} ${
        optFavorite ? "cursor-default" : "cursor-pointer"
      }`}
    >
      ⭐ {optFavs}
    </button>
  </fetcher.Form>
  );

  let optReposted = reposted;
  let optReposts = Number(post.reposts);
  
  if (fetcher.formAction === `/post/repost/${post.id}` && fetcher.state) {
    optReposted = !optReposted;
  }

  const reposts = (
    <fetcher.Form method="post" action={`/post/repost/${post.id}`}>
    <button
      type="submit"
      className={`text-green-500 px-2 ${(optReposted || repost) ? "saturate-100" : "saturate-0"}`}
    >
      ♻️ {optReposts}
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
