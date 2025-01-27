import TextCounters from '~/components/text-counters';


export interface StatsPanelProps {
  user: any;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ user }) => {

  return (
    <div className="flex flex-col w-2/5 h-full bg-gray-800 text-white">
      <div className="flex-1 p-4">
        <h1 className="text-xl">{user.name}</h1>
        <p>{user.bio}</p>
        <div className="py-4">
          <p className="text-2xl text-yellow-500 font-bold mb-4">$1</p>
        </div>
        
      </div>
      <div className="flex-1 p-4">

      </div>
      <div className="flex-1 p-4">
        <TextCounters />
      </div>
    </div>
  );
};

export default StatsPanel;