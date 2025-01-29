import TextCounters from '~/components/text-counters';

import { User } from '~/types';
export interface StatsPanelProps {
  user: User;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ user }) => {
  const countryFlagURL = (countryCode: string) =>
    `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`;

  return (
    <div className="flex flex-col w-2/5 h-full bg-gray-800 text-white">
      <div className="flex-1 p-4">
        <a href={`/timeline/${user.id}`}>
          <h1 className="text-xl">{user.name}</h1>
        </a>
        <p>{user.bio}</p>
        { user.country && (
          <img
            src={countryFlagURL(user.country)}
            alt={`${user.country}`}
            className="w-8 mt-2 rounded-lg shadow-lg"
          />
        )}
        <div className="py-4">
          <p className="text-2xl text-yellow-500 font-bold mb-4">$1</p>
        </div>  
      </div>
      
      <div className="flex-1 p-4">
        <h1 className="text-xl">0/5</h1>
      </div>

      <div className="flex-1 p-4">
        <TextCounters />
      </div>
    </div>
  );
};

export default StatsPanel;