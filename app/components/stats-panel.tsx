import TextCounters from '~/components/text-counters';
import UserInfo from '~/components/user-info';

import { User } from '~/types';

export interface StatsPanelProps {
  user: User;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ user }) => {

  return (
    <div className="flex flex-col w-2/5 h-full bg-gray-800 text-white">
      <div className="flex-1 p-4">
        <UserInfo user={user} />
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