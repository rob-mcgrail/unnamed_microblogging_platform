import { useFetcher, Link } from "@remix-run/react";
import { useState, useEffect, useRef } from "react";
import { Post as PostType } from "~/types";
import { useUser } from "~/contexts/user-context";

export interface PostProps {
  post: PostType;
  favorite: boolean;
  reposted: boolean;
}

const Post: React.FC<PostProps> = ({ post, favorite, reposted }) => {
  const { name, authorId, content, repost, repostedByName } = post;
  const { user } = useUser();
  
  const fetcher = useFetcher();

  // Optimistic favorite state
  const [optFavorite, setOptFavorite] = useState(favorite);
  const [optFavs, setOptFavs] = useState(Number(post.favs));
  const favoriteLockRef = useRef(false);

  useEffect(() => {
    if (!favoriteLockRef.current) {
      setOptFavorite(favorite);
      setOptFavs(Number(post.favs));
    }
  }, [favorite, post.favs]);

  const handleFavoriteClick = () => {
    if (fetcher.state !== "idle") return;
    favoriteLockRef.current = false;

    setOptFavorite((prev) => !prev);
    setOptFavs((prev) => (optFavorite ? prev - 1 : prev + 1));
    
    favoriteLockRef.current = true;
    
    setTimeout(() => {
      favoriteLockRef.current = false;
    }, 3000); // Lock for 10 seconds
  };

  const favorites = (
    <fetcher.Form method="post" action={`/post/favorite/${post.id}`}>
      <button
        type="submit"
        className={`px-2 ${!optFavorite ? "saturate-0" : ""} ${
          optFavorite ? "cursor-default" : "cursor-pointer"
        }`}
        onClick={handleFavoriteClick}
      >
        ⭐ {optFavs}
      </button>
    </fetcher.Form>
  );

  // Optimistic repost state
  const [optReposted, setOptReposted] = useState(reposted);
  const [optReposts, setOptReposts] = useState(Number(post.reposts));
  const repostLockRef = useRef(false);

  useEffect(() => {
    if (!repostLockRef.current) {
      setOptReposted(reposted);
      setOptReposts(Number(post.reposts));
    }
  }, [reposted, post.reposts]);

  const handleRepostClick = () => {
    if (user.id === authorId) return;
    if (fetcher.state !== "idle") return;
    repostLockRef.current = false;

    setOptReposted((prev) => !prev);
    setOptReposts((prev) => (optReposted ? prev - 1 : prev + 1));

    repostLockRef.current = true;

    setTimeout(() => {
      repostLockRef.current = false;
    }, 3000); // Lock for 10 seconds
  };

  const reposts = (
    <fetcher.Form method="post" action={`/post/repost/${post.id}`}>
      <button
        type="submit"
        className={`text-green-500 px-2 ${
          (optReposted || repost) ? "saturate-100" : "saturate-0"
        } ${
          (user.id == authorId) ? "cursor-default" : "cursor-pointer"
        }`}
        onClick={handleRepostClick}
      >
        ♻️ {optReposts}
      </button>
    </fetcher.Form>
  );

  return (
    <li className="bg-gray-700 p-4 rounded-lg text-white">
      <Link to={`/timeline/${authorId}`}>
        <h2 className="text-xl">
          {name}
          {repost && repostedByName && ` ♻️ by ${repostedByName}`}
        </h2>
      </Link>
      <p className="whitespace-pre">{content}</p>

      <div className="flex justify-around p-2">
        {reposts}
        {favorites}
      </div>
    </li>
  );
};

export default Post;
