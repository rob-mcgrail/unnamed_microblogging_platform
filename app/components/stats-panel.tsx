import TextCounters from '~/components/text-counters';


export interface StatsPanelProps {
  id: number;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ id }) => {
  return (
    <div key="id" className="w-1/2 bg-gray-800 text-white p-4">
      <TextCounters />
    </div>
  );
};

export default StatsPanel;