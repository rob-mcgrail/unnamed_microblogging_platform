import { Link } from "@remix-run/react";

import { User } from '~/types';

export interface UserInfoProps {
  user: User;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const countryFlagURL = (countryCode: string) =>
    `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`;

  return (
    <>
      <Link to={`/timeline/${user.id}`}>
        <h1 className="text-xl">{user.name}</h1>
      </Link>
      <p>{user.bio}</p>
      { user.country && (
        <img
          src={countryFlagURL(user.country)}
          alt={`${user.country}`}
          className="w-8 mt-2 rounded-lg shadow-lg"
        />
      )}
    </>
  );
};

export default UserInfo;